import React from 'react'

const Homecontent = () => {
  return (
    <div style={{padding: "0px 0px 50px 0px"}}>
        <div className='container'>
            <div className='row'>
                <div className='col-12'>
                    <h2 className='my-4'>About Us</h2>
                    <div className="blog-post">
                        <h2 className="blog-post-title">Sample blog post</h2>
                        <p className="blog-post-meta">January 1, 2021 by <a href="/">Mark</a></p>

                        <p>This blog post shows a few different types of content that’s supported and styled with Bootstrap. Basic typography, lists, tables, images, code, and more are all supported as expected.</p>
                        <hr/>
                        <p>This is some additional paragraph placeholder content. It has been written to fill the available space and show how a longer snippet of text affects the surrounding content. We'll repeat it often to keep the demonstration flowing, so be on the lookout for this exact same string of text.</p>
                        <h2>Blockquotes</h2>
                        <p>This is an example blockquote in action:</p>
                        <blockquote className="blockquote">
                            <p>Quoted text goes here.</p>
                        </blockquote>
                        <p>This is some additional paragraph placeholder content. It has been written to fill the available space and show how a longer snippet of text affects the surrounding content. We'll repeat it often to keep the demonstration flowing, so be on the lookout for this exact same string of text.</p>
                        <h3>Example lists</h3>
                        <p>This is some additional paragraph placeholder content. It's a slightly shorter version of the other highly repetitive body text used throughout. This is an example unordered list:</p>
                        <ul>
                            <li>First list item</li>
                            <li>Second list item with a longer description</li>
                            <li>Third list item to close it out</li>
                        </ul>
                        <p>And this is an ordered list:</p>
                        <pre><code>Example code block</code></pre>
                        <p>This is some additional paragraph placeholder content. It's a slightly shorter version of the other highly repetitive body text used throughout.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Homecontent
