---
layout: post
title: Windows 11 upgrade
date: 2024-09-10 06:00 +0100
categories: misc
excerpt_separator: <!--more-->
---

<section>
<h1>Experience upgrading from Windows 10 to 11</h1>
<!--more-->

<p>I recently upgraded my gaming PC from Windows 10 to 11. I couldn't find a blog post or guide that solved the issues I encountered so thought I'd put everything in one place here.</p>

After upgrading the motherboard to one that is [TPM 2.0 enabled](https://en.wikipedia.org/wiki/Trusted_Platform_Module) I expected this to be plain sailing.

Running the PC Health Check application returned a message stating that "TPM 2.0 must be supported and enabled on this PC". Well that sucks since this seemed to be enabled in the bios.

It turns out the reason this isn't actually enabled is because the boot drive was still in old nasty `MBR` format instead of `GPT`. GPT format is required to support `UEFI` and `TPM 2.0`.
A bit of info on the basics of this can be found [here](https://wiki.manjaro.org/index.php/Some_basics_of_MBR_v/s_GPT_and_BIOS_v/s_UEFI).

I wanted to avoid reinstalling Windows so after a bit of googling found that it's possible to use [MBR2GPT](https://learn.microsoft.com/en-us/windows/deployment/mbr-to-gpt) to convert it. I'm not sure why but I decided to do this using [Windows PE](https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/winpe-create-usb-bootable-drive?view=windows-11) (Windows Preinstallation Environment). This would let me boot into Windows PE which would have full control of the disk.

## Windows PE

The Microsoft guide on creating a Windows PE drive to boot didn't really gel with me and I ended up using this guide instead:
https://recoverit.wondershare.com/windows-pe/how-to-create-a-windows-pe-bootable-usb-drive.html

Long story short, download [Windows ADK](https://developer.microsoft.com/en-us/windows/hardware/windows-assessment-deployment-kit). But unlike the guide says, make sure to install the ADK one that comes with `Windows PE add-on`. Then we can use the ADK installer to install the `Deployment Tools` and `Windows Preinstallation Environment`.

It was then just a case of running `Windows Deployment and Imaging Tools Environment` as admin and copying the windows PE files to a FAT32 formatted USB.
First create a copy of the Windows PE files using the following command:
`copype amd64 C:\WinPE`. This will create files for a 64 bit build in the C:\WinPE directory.

Then install these files to the usb stick using something like:
`MakeWinPEMedia /UFD C:\WinPE P:`. Here P: is the drive letter.

Then just reboot and make sure we boot from the usb.

## MBR2GPT - First blocker

Great. So now the plan was to use `MBR2GPT` to convert the disk, make sure TPM is enabled in bios and install Windows 11.

We can run a validation step before we actually convert the disk.
`mbr2gpt /validate /disk:0 `.
Unfortunately....running this resulted in this error:
`Disk layout validation failed for disk 0`.
What a useful error message this is. Why did it fail? Who knows...

From a bit of googling around I stumbled on a forum with this issue:
https://techcommunity.microsoft.com/t5/windows-10/mbr2gpt-disk-layout-validation-failed/m-p/175166/page/2

In here there was some posts relating to the number of partitions.
Checking disk management back in Windows showed that I had 4 partitions on the disk instead of the desired 3. There were 2 recovery partitions for some reason.
Taking a gamble, decided to delete the first recovery partition and extend the main partition.

Time to try the validation step again...

## MBR2GPT - Second blocker

This time we get a new error, which should be counted as progress.
`Cannot find OS partition(s) for disk 0 `.
Well that's a strange error since I'm pretty sure it has an OS on it right? I'm not sure this error was occurring but found the solution to this in another forum search:
https://answers.microsoft.com/en-us/windows/forum/all/issues-using-mbr2gpt-for-windows-11-upgrade/a4a4e379-ff61-4624-8df7-a92580e14212

Basically use [`bcdboot`](https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/bcdboot-command-line-options-techref-di?view=windows-11) to copy some bootfiles to one of the partition. I didn't have full confidence in this but after seeing that the legend that is [Scott Hanselman use this](https://www.hanselman.com/blog/switching-my-windows-7-boot-disk-from-d-to-c-with-bcdboot-rather-than-bcdedit) that seemed good enough.

I ran `bcdboot c:\windows /s c:` and then went into disk management and marked the C drive as 'active'. I think that second step might be optional and it's worth trying without doing it.

## MBR2GPT - third time lucky

Running validation this time...passed ok. Woo.
The next step was running convert by doing:
`mbr2gpt /validate /disk:0 `.
This ran ok with no issues. Happy days.

I then went into my MFI BIOS and changed the boot mode from `Legacy + UEFI` to just `UEFI`. Also ensuring the TPM stuff was enabled too.

## Install Windows 11

Right, last step. Boot back into Windows 10. Ran the `PC Health Check` app. This showed all green ticks. This navigated me to windows update to install windows 11...annnd....windows update stated that the PC doesn't meet the system requirements. What??

Basically [the answer](https://answers.microsoft.com/en-us/windows/forum/all/pc-health-check-says-im-eligible-for-windows-11/b54bb93e-8eac-4019-bb48-125498b36059) to this was...just install Windows 11 anyway (I wonder if we could have done that from the start...I don't want to know). Installed Windows 11 using the [installation assistant](https://www.microsoft.com/en-in/software-download/windows11?3ffbea20-eb11-4a96-85d6-f356b820d828=True) and this worked absolutely fine :-)

Hopefully this post might help some people save time as I was sprawled out across google with hundreds of tabs not really knowing what I was doing.

</section>
