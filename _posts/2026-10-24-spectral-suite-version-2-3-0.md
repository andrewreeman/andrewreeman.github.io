---
layout: post
title: Spectral Suite version 2.3.0
date: 2026-10-24 14:00 +0100
categories: vst fft specrelease
excerpt_separator: <!--more-->
---

<section>
<h1>Spectral Suite version 2.3.0 released</h1>
<p>Version 2.3.0 of the <a href="/spectralsuite">Spectral Suite</a> has now been released.</p>
<!--more-->

<p>This is mostly a stability release:</p>
<ul>
  <li>Fixed Phase Lock crashing when toggled quickly during playback</li>
  <li>Fixed Bin Scrambler going silent or extremely loud when a project is loaded with a non-default FFT size</li>
  <li>Changing FFT size, overlap, style or window during use is more reliable</li>
  <li>Removed a stray "C4" label from Frequency Magnet</li>
</ul>

<p>There are also proper installers now: a macOS installer (Intel and Apple Silicon) and a Windows installer, plus a Linux build. The macOS installer isn't signed by Apple, so the first time you open it macOS will block it. Go to System Settings → Privacy & Security and choose "Open Anyway".</p>

<a href="https://github.com/andrewreeman/SpectralSuite/releases/tag/v2.3.0"><h4>Windows, Mac and Linux downloads here</h4></a>

</section>
