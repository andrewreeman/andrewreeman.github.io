---
layout: page
title: Grid layout examples
permalink: /about/
---


<h1>Examples of using Grid Layout (with kittens)</h1>
<p>These examples are based on tutorials by <a href="https://gridbyexample.com/">Rachel Andrew</a></p>    
<section id="section-defining">
    <h2>Defining a grid</h2>
    <p>
        We can define a grid simply by setting the <code>display</code> property to <code>grid</code>.
        Defining the columns is as simple as specifying the widths to the <code>grid-template-columns</code> property.
        We can do the same for the rows using the <code>grid-template-rows</code> property.
        If any more rows are added then we can use the <code>grid-auto-rows</code> property to define these heights.
        To specify the gap between columns we can use <code>grid-column-gap</code> property and for rows we can use the <code>grid-row-gap</code> property.
        If instead we want to specify both at once we can use the <code>grid-gap</code> property. In grid layout terminology we use the term <em>track</em> for referring to a row or a column.
    </p>
    <p data-height="500" data-theme-id="0" data-slug-hash="rqwvmM" data-default-tab="css,result" data-user="andrewreeman" data-pen-title="Defining a grid" data-preview="true" class="codepen">
        See  the Pen <a href="https://codepen.io/andrewreeman/pen/rqwvmM/">Defining a grid</a> by Andrew Reeman (<a href="https://codepen.io/andrewreeman">@andrewreeman</a>) on <a href="https://codepen.io">CodePen</a>.
    </p>
    <script async src="https://static.codepen.io/assets/embed/ei.js"></script>
</section>

<section id="section-fr">
    <h2>Using the fr unit</h2>
    <p>
        A problem with the above example is that the columns stay at given fixed pixel size regardless of how large the screen is. We can use the <code>fr</code> unit to address this.
        The fr unit stands for <em>fractional</em> and represents a fraction of the available space in the grid. 
        If we replaced the <code>grid-template-columns</code> with <code>1fr 1fr 1fr</code> then each of the three columns will take an equal amount of space.
        Notice that this time the layout is more responsive. We can view this on different widths and it takes this into account.
        If we wanted the first column to be larger then we could use something like <code>2fr 1fr 1fr</code>.
        We can also mix fr units and standard units so times when we need to display a particular column as a fixed size. For example: <code>1fr 100px 1fr</code>                                    
    </p>       
    <p data-height="500" data-theme-id="0" data-slug-hash="oawdQM" data-default-tab="css,result" data-user="andrewreeman" data-pen-title="The fr unit" data-preview="true" class="codepen">
        See the Pen <a href="https://codepen.io/andrewreeman/pen/oawdQM/">The fr unit</a> by Andrew Reeman (<a href="https://codepen.io/andrewreeman">@andrewreeman</a>) on <a href="https://codepen.io">CodePen</a>.
    </p>
    <script async src="https://static.codepen.io/assets/embed/ei.js"></script>        
</section>

<section id="section-repeat">
    <h2>Repeat notation</h2>
    <p>
        Instead of explicitly stating each track we can use repeat notation to repeat a pattern of tracks. We do this by using the <code>repeat</code> function in our <code>grid-template-columns</code> or <code>grid-template-rows</code>. For example: <code>grid-template-columns: repeat(2, 1fr 2fr);</code>. The first argument is how many times we should repeat this pattern. The second argument is the pattern itself.
    </p>
    <p data-height="500" data-theme-id="0" data-slug-hash="GYvGrb" data-default-tab="html,result" data-user="andrewreeman" data-pen-title="Repeat notation" data-preview="true" class="codepen">
        See the Pen <a href="https://codepen.io/andrewreeman/pen/GYvGrb/">Repeat notation</a> by Andrew Reeman (<a href="https://codepen.io/andrewreeman">@andrewreeman</a>) on <a href="https://codepen.io">CodePen</a>.
    </p>
    <script async src="https://static.codepen.io/assets/embed/ei.js"></script>    
</section>