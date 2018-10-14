---
layout: post
title: Grid layout examples
date:   2018-10-13 13:06:14 +0100
categories: css grid
excerpt_separator: <!--more-->
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
    <!--more-->
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
<section id="section-minmax">
    <h2>The minmax function</h2>
    <p>
        The minmax function can be used for column or row templates. It determines the minimum and maximum size a track will be. This is useful for contraining a responsive layout. <aside>The example below also makes use of <code>grid-auto-rows</code> which is used to specify implicitly created row tracks when the row count is greater than the row template count. </aside>
    </p>
    <p data-height="500" data-theme-id="0" data-slug-hash="OBjGzB" data-default-tab="html,result" data-user="andrewreeman" data-pen-title="Minmax" data-preview="true" class="codepen">
        See the Pen <a href="https://codepen.io/andrewreeman/pen/OBjGzB/">Minmax</a> by Andrew Reeman (<a href="https://codepen.io/andrewreeman">@andrewreeman</a>) on <a href="https://codepen.io">CodePen</a>.
    </p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
</section>
<section id="section-order">
    <h2>Order</h2>
    <p>We can change the display order of items by using the <code>order</code> keyword. The higher the number the lower the priority. By default everything will have a priority of 0.</p>
    <p data-height="500" data-theme-id="0" data-slug-hash="rqzgVm" data-default-tab="html,result" data-user="andrewreeman" data-pen-title="Order" data-preview="true" class="codepen">
        See the Pen <a href="https://codepen.io/andrewreeman/pen/rqzgVm/">Order</a> by Andrew Reeman (<a href="https://codepen.io/andrewreeman">@andrewreeman</a>) on <a href="https://codepen.io">CodePen</a>.
    </p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
</section>
<section id="section-auto-fill">
    <h2>Auto fill and auto fit</h2>
    <p>
        So far we have had to specify how many columns we require. But in many situations it can be difficult to know in advance how many columns we will need especially if we are loading dynamic content. We can use the <code>auto-fill</code> and <code>auto-fit</code> keywords as arguments to the <code>repeat</code> function to create columns to distribute the items evenly. Auto-fill will distribute the items and if there is space left over it will fill it empty items. Auto-fit will do the same but when there is space left over it will grow the items to fit to the space.
    </p>
    <p data-height="500" data-theme-id="0" data-slug-hash="jeLoKy" data-default-tab="html,result" data-user="andrewreeman" data-pen-title="Autofill and autofit" data-preview="true" class="codepen">
        See the Pen <a href="https://codepen.io/andrewreeman/pen/jeLoKy/">Autofill and autofit</a> by Andrew Reeman (<a href="https://codepen.io/andrewreeman">@andrewreeman</a>) on <a href="https://codepen.io">CodePen</a>.
    </p>
    <script async src="https://static.codepen.io/assets/embed/ei.js"></script>
</section>
<section id="section-auto-placement">
    <h2>Using span to auto place items</h2>    
    <p>
        We can use <code>grid-column-start</code> and <code>grid-column-end</code> to specify which columns an item can take up. Specifying an integer will ensure the start or end will be this specific column. We can use a negative number to specify a column from the end. For example -1 will be the last column and -2 will be the one before this. We can use the <code>span</code> keyword to indicate that the number specified is how many columns should take up instead of a particular column. For instance <code>grid-column-end: span 2</code> means that the item will be 2 columns from it's start. <code>grid-column-start: 3</code> means that the item will be 3 columns from it's end. The span keyword also applies to the row versions of this which are <code>grid-row-start</code> and <code>grid-row-end</code>.        
        A shorthand for using grid-column-start and grid-column-end is the <code>grid-column</code> attribute. This one argument for the start and another for the end separated by a forward slash. For example: <code>grid-column: 3 / -1</code> means start at column 3 and continue until the end. The row version of this is unsurprisingly: <code>grid-row</code>.
        Now that we can specify the span of rows and columns we may end up with many variable sized items and this can lead to quite a bit of white space. 
        We can use the <code>  grid-auto-flow: dense</code> attribute and keyword which will change the order of items to ensure that they are tightly packed into the grid.
    </p>.            
    <p data-height="500" data-theme-id="0" data-slug-hash="YJxmKZ" data-default-tab="html,result" data-user="andrewreeman" data-pen-title="Span and     auto-placement" data-preview="true" class="codepen">
    See the Pen <a href="https://codepen.io/andrewreeman/pen/YJxmKZ/">Span and auto-placement</a> by Andrew Reeman (<a href="https://codepen.io/andrewreeman">@andrewreeman</a>) on <a href="https://codepen.io">CodePen</a>.
    </p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
</section>
<section id="section-named-lines">
    <h2>Named tracks</h2>
    <p>
        Tracks can be named by specifying the name in square brackets before the track. For example: <code>grid-template-columns: [sidebar] 100px [content] 300px [ads] auto [ads-end]</code>. In this case the first column is named 'sidebar', the second is named 'content' and the last is named 'ads'. The end of the last column is also named 'ads-end'. The below example shows usage with named rows as well as columns.        
    </p>
    <p data-height="500" data-theme-id="0" data-slug-hash="oaGvzM" data-default-tab="html,result" data-user="andrewreeman" data-pen-title="Names lines" data-preview="true" class="codepen">
        See the Pen <a href="https://codepen.io/andrewreeman/pen/oaGvzM/">Names lines</a> by Andrew Reeman (<a href="https://codepen.io/andrewreeman">@andrewreeman</a>) on <a href="https://codepen.io">CodePen</a>.
    </p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
</section>
<section id="section-align-justify"> 
    <h2>Align and justify</h2>
    <p>We can use <code>justify-items</code> to align items horizontally and <code>align-items</code> to align items vertically. We can also use <code>justify-self</code> and <code>align-self</code> to perform alignment on specific items</p>
    <p data-height="500" data-theme-id="0" data-slug-hash="ReLRmp" data-default-tab="html,result" data-user="andrewreeman" data-pen-title="Aligning and justifying items" data-preview="true" class="codepen">
        See the Pen <a href="https://codepen.io/andrewreeman/pen/ReLRmp/">Aligning and justifying items</a> by Andrew Reeman (<a href="https://codepen.io/andrewreeman">@andrewreeman</a>) on <a href="https://codepen.io">CodePen</a>.
    </p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
</section>
<section id="section-align-justfiy-grid">
    <h2>Align and justify grid tracks</h2>
    <p>Aligning and justifying the grid tracks instead of the items is done by using the <code>justify-content</code> and <code>align-content</code> keywords. Justify-content will align the columns and align-content will align the rows.</p>
    <p data-height="500" data-theme-id="0" data-slug-hash="EdwbqY" data-default-tab="html,result" data-user="andrewreeman" data-pen-title="Aligning and justifying the grid" data-preview="true" class="codepen">
        See the Pen <a href="https://codepen.io/andrewreeman/pen/EdwbqY/">Aligning and justifying the grid</a> by Andrew Reeman (<a href="https://codepen.io/andrewreeman">@andrewreeman</a>) on <a href="https://codepen.io">CodePen</a>.
    </p>
    <script async src="https://static.codepen.io/assets/embed/ei.js"></script>
</section>
<section id="section-grid-areas">
    <h2>Grid areas</h2>
    <p>Grid areas are extremely useful for laying out the grid. We can name a particular area that an item belongs too by using the <code>grid-area</code> attribute. On the grid we can use <code>grid-template-areas</code> to create a layout for all of these named areas.</p>
    <p>We lay this out by writing a grid usings strings that visually represent the grid. For example: </p>
    <samp>grid-template-areas:
        <br>&nbsp;&nbsp;&nbsp;&nbsp;"header header" 
        <br>&nbsp;&nbsp;&nbsp;&nbsp;"main image" 
        <br>&nbsp;&nbsp;&nbsp;&nbsp;"footer ."
    </samp>
    <p>This will create a grid with two columns and three rows placing the header over two columns with the main content and an image taking a column each. The footer will take up a single column with an empty item in the second column.</p>     
    <p data-height="500" data-theme-id="0" data-slug-hash="XxeYqz" data-default-tab="css,result" data-user="andrewreeman" data-pen-title="Grid areas" data-preview="true" class="codepen">
        See the Pen <a href="https://codepen.io/andrewreeman/pen/XxeYqz/">Grid areas</a> by Andrew Reeman (<a href="https://codepen.io/andrewreeman">@andrewreeman</a>) on <a href="https://codepen.io">CodePen</a>.
    </p>
    <script async src="https://static.codepen.io/assets/embed/ei.js"></script>
</section>