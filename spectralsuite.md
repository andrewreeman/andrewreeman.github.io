---
layout: page
title: Spectral Suite
permalink: /spectralsuite/
---

<html>

<section>
<p>The Spectral Suite is a collection of audio plugins that utilise the FFT algorithm to manipulate the spectral components of the input audio.
</p>
</section>

<p>Release history:</p>

<ul>
  {% for post in site.categories.specsuite %}
    {% if post.url %}
        <li><a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endif %}
  {% endfor %}
</ul>

<section>
<h2>Phase Lock</h2>
<iframe width="560" height="315" src="https://www.youtube.com/embed/qGX1eLIMen0?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<p>
Locks the phase and/or locks the frequency
</p>
</section>

<section>
<h2>Morph</h2>
<iframe width="560" height="315" src="https://www.youtube.com/embed/SH5rzbxFa4M?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<p>
Manipulate the shape of the frequency content
</p>
</section>
<section>
<h2>Bin Scrambler</h2>
<iframe width="560" height="315" src="https://www.youtube.com/embed/iY3gss8ljVA?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<iframe width="560" height="315" src="https://www.youtube.com/embed/jHky7Vbqz6U?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<p>
This plugin will scramble the frequency components of a signal at a provided range and rate.
</p>
</section>

<section>
<h2>Frequency Shift</h2>
<iframe width="560" height="315" src="https://www.youtube.com/embed/RBVpPtHwRq4?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<iframe width="560" height="315" src="https://www.youtube.com/embed/qhzMPuzd_fY?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<p>
Shifts frequencies up and down
</p>
</section>

<section>
<h2>Spectral Gate</h2>
<iframe width="560" height="315" src="https://www.youtube.com/embed/1JYEtygN1RE?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<iframe width="560" height="315" src="https://www.youtube.com/embed/PxL0OAgxjAY?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<p>
Only allow frequency components above or below a particular cut-off amplitude.
</p>
</section>

<section>
<h2>Frequency Magnet</h2>
<iframe width="560" height="315" src="https://www.youtube.com/embed/cWAH6HFsJLY?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<iframe width="560" height="315" src="https://www.youtube.com/embed/FI58xkY3LuE?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<p>
Frequency content will gradually shift towards being centered on one frequency.
</p>
</section>

<section>

<h2>Sinusoidal Shaped Filter</h2>
<iframe width="560" height="315" src="https://www.youtube.com/embed/MkF8ZIuajuA?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<iframe width="560" height="315" src="https://www.youtube.com/embed/3nBAGk48Ji4?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<p>
Filters the frequency components according by applying a sinusoudal shape over the spectrum.
</p>
</section>

<section>
<h2>Video review and tutorial</h2>
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/0OT8PVCDJIo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<p>There's not much in the way of documentation yet...so while you wait here is a great video review by <a href="https://www.youtube.com/c/Naircol/videos">Naircol</a> of these plugins that provides more info on how to use them and what they do.</p>
</section>
ircol
</html>
