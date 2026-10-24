#!/usr/bin/env python3
"""Validate spectral_suite_publish.json, the file Spectral Suite's in-app update
check downloads.

Every installed plugin parses this file, so a malformed one can stop users being
told about a release, or break the check outright. This verifies:

  - it is valid JSON with the fields and types the plugin reads
  - `code` has gone up compared with the base branch whenever the file changed
  - a published vX.Y.Z release exists on the SpectralSuite repository
  - SpectralSuite's CMakeLists.txt at that tag has the same version and
    VERSION_CODE, so the plugin that users install reports the code announced here

Usage: check_publish_json.py [path] [--base-ref REF]
"""

import argparse
import json
import os
import re
import subprocess
import sys
import urllib.error
import urllib.request

REPO = "andrewreeman/SpectralSuite"


def fetch(url):
    request = urllib.request.Request(url, headers={"User-Agent": "publish-json-check"})
    token = os.environ.get("GITHUB_TOKEN")
    if token and url.startswith("https://api.github.com/"):
        request.add_header("Authorization", f"Bearer {token}")
    with urllib.request.urlopen(request, timeout=30) as response:
        return response.read().decode()


def base_version(path, base_ref):
    """The file's content on the base branch, or None if unavailable."""
    if not base_ref:
        return None
    shown = subprocess.run(["git", "show", f"{base_ref}:{path}"], capture_output=True, text=True)
    if shown.returncode != 0:
        return None
    try:
        return json.loads(shown.stdout)
    except json.JSONDecodeError:
        return None


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("path", nargs="?", default="spectral_suite_publish.json")
    parser.add_argument("--base-ref")
    args = parser.parse_args()

    problems = []

    try:
        with open(args.path) as f:
            data = json.load(f)
    except (OSError, json.JSONDecodeError) as e:
        print(f"FAIL: {args.path} is not readable JSON: {e}")
        return 1

    if not isinstance(data, dict):
        print("FAIL: top level must be a JSON object")
        return 1

    version = data.get("version")
    code = data.get("code")
    notes = data.get("release_notes")
    url = data.get("release_url")

    if not isinstance(version, str) or not re.fullmatch(r"[0-9]+\.[0-9]+\.[0-9]+", version):
        problems.append(f"version must be a string like \"2.3.0\", got {version!r}")
    if not isinstance(code, int) or isinstance(code, bool) or code < 1:
        problems.append(f"code must be a positive whole number, got {code!r}")
    if not isinstance(notes, list) or not notes or not all(isinstance(n, str) and n.strip() for n in notes):
        problems.append("release_notes must be a non-empty list of non-empty strings")
    if not isinstance(url, str) or not url.startswith("https://"):
        problems.append(f"release_url must be an https URL, got {url!r}")

    base = base_version(args.path, args.base_ref)
    if base is not None and base != data and isinstance(code, int):
        base_code = base.get("code")
        if isinstance(base_code, int) and code <= base_code:
            problems.append(f"code must increase when the file changes: base has {base_code}, this has {code}")

    if not problems:
        tag = f"v{version}"
        try:
            release = json.loads(fetch(f"https://api.github.com/repos/{REPO}/releases/tags/{tag}"))
            if release.get("draft") or release.get("prerelease"):
                problems.append(f"{REPO} release {tag} is a draft or prerelease")
        except urllib.error.HTTPError as e:
            problems.append(f"no published {REPO} release {tag} (HTTP {e.code})")

        try:
            cmake = fetch(f"https://raw.githubusercontent.com/{REPO}/{tag}/CMakeLists.txt")
            cmake_version = re.search(r"^project\(SpectralSuite VERSION ([0-9.]+)\)", cmake, re.M)
            cmake_code = re.search(r"^SET\(VERSION_CODE ([0-9]+)\)", cmake, re.M | re.I)
            if not cmake_version or cmake_version.group(1) != version:
                problems.append(f"CMakeLists.txt at {tag} has version "
                                f"{cmake_version.group(1) if cmake_version else 'unknown'}, not {version}")
            if not cmake_code or int(cmake_code.group(1)) != code:
                problems.append(f"CMakeLists.txt at {tag} has VERSION_CODE "
                                f"{cmake_code.group(1) if cmake_code else 'unknown'}, not {code}; "
                                f"users' plugins compare against that code")
        except urllib.error.HTTPError as e:
            problems.append(f"could not read CMakeLists.txt at {tag} (HTTP {e.code})")

    print(f"version {version!r}, code {code!r}, {len(notes) if isinstance(notes, list) else 0} release notes")
    if base is not None:
        print(f"base branch: version {base.get('version')!r}, code {base.get('code')!r}")
    if problems:
        for p in problems:
            print(f"FAIL: {p}")
        return 1
    print("OK")
    return 0


if __name__ == "__main__":
    sys.exit(main())
