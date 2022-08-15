"use strict";(self.webpackChunkvuepress_theme_knzn=self.webpackChunkvuepress_theme_knzn||[]).push([[6459],{9:(n,s,a)=>{a.r(s),a.d(s,{data:()=>e});const e=JSON.parse('{"key":"v-26cdd7e2","path":"/60c9b386a2b8c850f2a9819f1a5452fa/","title":"23 前面跳过的 unkown 类型详解","lang":"zh-CN","frontmatter":{"permalink":"/60c9b386a2b8c850f2a9819f1a5452fa/","title":"23 前面跳过的 unkown 类型详解","author":"前端程序猿","tags":["typescript"],"categories":["大前端"],"postImage":"/images/typescript.webp"},"excerpt":"<p>学习完交叉类型、联合类型、类型断言、映射类型、索引后，我们就可以补充一个基础类型中没有讲的知识了，就是 TS 在 3.0 版本新增的顶级类型 unknown。它相对于 any 来说是安全的。关于 unknown 类型，有如下几点需要注意，我们来逐个讲解和举例学习：</p>\\n","headers":[{"level":3,"title":"(1) 任何类型的值都可以赋值给 unknown 类型：","slug":"_1-任何类型的值都可以赋值给-unknown-类型","children":[]},{"level":3,"title":"(2) 如果没有类型断言或基于控制流的类型细化时 unknown 不可以赋值给其它类型，此时它只能赋值给 unknown 和 any 类型：","slug":"_2-如果没有类型断言或基于控制流的类型细化时-unknown-不可以赋值给其它类型-此时它只能赋值给-unknown-和-any-类型","children":[]},{"level":3,"title":"(3) 如果没有类型断言或基于控制流的类型细化，则不能在它上面进行任何操作：","slug":"_3-如果没有类型断言或基于控制流的类型细化-则不能在它上面进行任何操作","children":[]},{"level":3,"title":"(4) unknown 与任何其它类型组成的交叉类型，最后都等于其它类型：","slug":"_4-unknown-与任何其它类型组成的交叉类型-最后都等于其它类型","children":[]},{"level":3,"title":"(5) unknown 与任何其它类型组成的联合类型，都等于 unknown 类型，但只有 any 例外，unknown 与 any 组成的联合类型等于 any)：","slug":"_5-unknown-与任何其它类型组成的联合类型-都等于-unknown-类型-但只有-any-例外-unknown-与-any-组成的联合类型等于-any","children":[]},{"level":3,"title":"(6) never 类型是 unknown 的子类型：","slug":"_6-never-类型是-unknown-的子类型","children":[]},{"level":3,"title":"(7) keyof unknown 等于类型 never：","slug":"_7-keyof-unknown-等于类型-never","children":[]},{"level":3,"title":"(8) 只能对 unknown 进行等或不等操作，不能进行其它操作：","slug":"_8-只能对-unknown-进行等或不等操作-不能进行其它操作","children":[]},{"level":3,"title":"(9) unknown 类型的值不能访问其属性、作为函数调用和作为类创建实例：","slug":"_9-unknown-类型的值不能访问其属性、作为函数调用和作为类创建实例","children":[]},{"level":3,"title":"(10) 使用映射类型时如果遍历的是 unknown 类型，则不会映射任何属性：","slug":"_10-使用映射类型时如果遍历的是-unknown-类型-则不会映射任何属性","children":[]},{"level":2,"title":"本节小结","slug":"本节小结","children":[]}],"git":{"updatedTime":1660295074000,"contributors":[{"name":"zhi.li","email":"zhi.li@xjsd.com","commits":1}]},"filePathRelative":"TypeScript学习笔记/23-Detailed-explanation-of-unknown-types-skipped-earlier.md"}')},7793:(n,s,a)=>{a.r(s),a.d(s,{default:()=>o});var e=a(6252);const t=[(0,e.uE)('<p>学习完交叉类型、联合类型、类型断言、映射类型、索引后，我们就可以补充一个基础类型中没有讲的知识了，就是 TS 在 3.0 版本新增的顶级类型 unknown。它相对于 any 来说是安全的。关于 unknown 类型，有如下几点需要注意，我们来逐个讲解和举例学习：</p><blockquote><p>人生的旅途，前途很远，也很暗。然而不要怕，不怕的人的面前才有路 ——鲁迅</p></blockquote><h3 id="_1-任何类型的值都可以赋值给-unknown-类型" tabindex="-1"><a class="header-anchor" href="#_1-任何类型的值都可以赋值给-unknown-类型" aria-hidden="true">#</a> (1) 任何类型的值都可以赋值给 unknown 类型：</h3><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">let</span> value1<span class="token operator">:</span> <span class="token builtin">unknown</span>\nvalue1 <span class="token operator">=</span> <span class="token string">&#39;a&#39;</span>\nvalue1 <span class="token operator">=</span> <span class="token number">123</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-如果没有类型断言或基于控制流的类型细化时-unknown-不可以赋值给其它类型-此时它只能赋值给-unknown-和-any-类型" tabindex="-1"><a class="header-anchor" href="#_2-如果没有类型断言或基于控制流的类型细化时-unknown-不可以赋值给其它类型-此时它只能赋值给-unknown-和-any-类型" aria-hidden="true">#</a> (2) 如果没有类型断言或基于控制流的类型细化时 unknown 不可以赋值给其它类型，此时它只能赋值给 unknown 和 any 类型：</h3><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">let</span> value2<span class="token operator">:</span> <span class="token builtin">unknown</span>\n<span class="token keyword">let</span> value3<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">=</span> value2 <span class="token comment">// error 不能将类型“unknown”分配给类型“string”</span>\nvalue1 <span class="token operator">=</span> value2\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-如果没有类型断言或基于控制流的类型细化-则不能在它上面进行任何操作" tabindex="-1"><a class="header-anchor" href="#_3-如果没有类型断言或基于控制流的类型细化-则不能在它上面进行任何操作" aria-hidden="true">#</a> (3) 如果没有类型断言或基于控制流的类型细化，则不能在它上面进行任何操作：</h3><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">let</span> value4<span class="token operator">:</span> <span class="token builtin">unknown</span>\nvalue4 <span class="token operator">+=</span> <span class="token number">1</span> <span class="token comment">// error 对象的类型为 &quot;unknown&quot;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-unknown-与任何其它类型组成的交叉类型-最后都等于其它类型" tabindex="-1"><a class="header-anchor" href="#_4-unknown-与任何其它类型组成的交叉类型-最后都等于其它类型" aria-hidden="true">#</a> (4) unknown 与任何其它类型组成的交叉类型，最后都等于其它类型：</h3><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">type1</span> <span class="token operator">=</span> <span class="token builtin">unknown</span> <span class="token operator">&amp;</span> <span class="token builtin">string</span> <span class="token comment">// type1 =&gt; string</span>\n<span class="token keyword">type</span> <span class="token class-name">type2</span> <span class="token operator">=</span> <span class="token builtin">number</span> <span class="token operator">&amp;</span> <span class="token builtin">unknown</span> <span class="token comment">// type2 =&gt; number</span>\n<span class="token keyword">type</span> <span class="token class-name">type3</span> <span class="token operator">=</span> <span class="token builtin">unknown</span> <span class="token operator">&amp;</span> <span class="token builtin">unknown</span> <span class="token comment">// type3 =&gt; unknown</span>\n<span class="token keyword">type</span> <span class="token class-name">type4</span> <span class="token operator">=</span> <span class="token builtin">unknown</span> <span class="token operator">&amp;</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token comment">// type4 =&gt; string[]</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-unknown-与任何其它类型组成的联合类型-都等于-unknown-类型-但只有-any-例外-unknown-与-any-组成的联合类型等于-any" tabindex="-1"><a class="header-anchor" href="#_5-unknown-与任何其它类型组成的联合类型-都等于-unknown-类型-但只有-any-例外-unknown-与-any-组成的联合类型等于-any" aria-hidden="true">#</a> (5) unknown 与任何其它类型组成的联合类型，都等于 unknown 类型，但只有 any 例外，unknown 与 any 组成的联合类型等于 any)：</h3><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">type5</span> <span class="token operator">=</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">unknown</span> <span class="token comment">// type5 =&gt; unknown</span>\n<span class="token keyword">type</span> <span class="token class-name">type6</span> <span class="token operator">=</span> <span class="token builtin">any</span> <span class="token operator">|</span> <span class="token builtin">unknown</span> <span class="token comment">// type6 =&gt; any</span>\n<span class="token keyword">type</span> <span class="token class-name">type7</span> <span class="token operator">=</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">|</span> <span class="token builtin">unknown</span> <span class="token comment">// type7 =&gt; unknown</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-never-类型是-unknown-的子类型" tabindex="-1"><a class="header-anchor" href="#_6-never-类型是-unknown-的子类型" aria-hidden="true">#</a> (6) never 类型是 unknown 的子类型：</h3><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">type8</span> <span class="token operator">=</span> <span class="token builtin">never</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token builtin">unknown</span></span> <span class="token operator">?</span> <span class="token boolean">true</span> <span class="token operator">:</span> <span class="token boolean">false</span> <span class="token comment">// type8 =&gt; true</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_7-keyof-unknown-等于类型-never" tabindex="-1"><a class="header-anchor" href="#_7-keyof-unknown-等于类型-never" aria-hidden="true">#</a> (7) keyof unknown 等于类型 never：</h3><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">type9</span> <span class="token operator">=</span> <span class="token keyword">keyof</span> <span class="token builtin">unknown</span> <span class="token comment">// type9 =&gt; never</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_8-只能对-unknown-进行等或不等操作-不能进行其它操作" tabindex="-1"><a class="header-anchor" href="#_8-只能对-unknown-进行等或不等操作-不能进行其它操作" aria-hidden="true">#</a> (8) 只能对 unknown 进行等或不等操作，不能进行其它操作：</h3><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>value1 <span class="token operator">===</span> value2\nvalue1 <span class="token operator">!==</span> value2\nvalue1 <span class="token operator">+=</span> value2 <span class="token comment">// error</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9-unknown-类型的值不能访问其属性、作为函数调用和作为类创建实例" tabindex="-1"><a class="header-anchor" href="#_9-unknown-类型的值不能访问其属性、作为函数调用和作为类创建实例" aria-hidden="true">#</a> (9) unknown 类型的值不能访问其属性、作为函数调用和作为类创建实例：</h3><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">let</span> value5<span class="token operator">:</span> <span class="token builtin">unknown</span>\nvalue5<span class="token punctuation">.</span>age <span class="token comment">// error</span>\n<span class="token function">value5</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// error</span>\n<span class="token keyword">new</span> <span class="token class-name">value5</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// error</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_10-使用映射类型时如果遍历的是-unknown-类型-则不会映射任何属性" tabindex="-1"><a class="header-anchor" href="#_10-使用映射类型时如果遍历的是-unknown-类型-则不会映射任何属性" aria-hidden="true">#</a> (10) 使用映射类型时如果遍历的是 unknown 类型，则不会映射任何属性：</h3><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Types<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token punctuation">[</span><span class="token constant">P</span> <span class="token keyword">in</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token builtin">number</span> <span class="token punctuation">}</span>\n<span class="token keyword">type</span> <span class="token class-name">type10</span> <span class="token operator">=</span> Types<span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token operator">&gt;</span> <span class="token comment">// type10 =&gt; { [x: string]: number }</span>\n<span class="token keyword">type</span> <span class="token class-name">type11</span> <span class="token operator">=</span> Types<span class="token operator">&lt;</span><span class="token builtin">unknown</span><span class="token operator">&gt;</span> <span class="token comment">// type10 =&gt; {}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们在实际使用中，如果有类型无法确定的情况，要尽量避免使用 any，因为 any 会丢失类型信息，一旦一个类型被指定为 any，那么在它上面进行任何操作都是合法的，所以会有意想不到的情况发生。因此如果遇到无法确定类型的情况，要先考虑使用 unknown</p><h2 id="本节小结" tabindex="-1"><a class="header-anchor" href="#本节小结" aria-hidden="true">#</a> 本节小结</h2><p>本小节我们详细学习了 unknown 类型，它和 any 有相似的特点，就是制定一个类型是任意的，但是区别在于制定一个类型为 any 的话，可以在这个值上做任意操作，而 unknown 类型则不允许在没有类型断言或基于控制流的类型细化时对 unknown 类型的值做任何操作。</p><p>下个小节我们将学习条件类型，它看起来像是三元操作符的写法，其实效果确实很像，只不过它判断的是类型，返回的结果也是类型。</p>',26)],p={},o=(0,a(3744).Z)(p,[["render",function(n,s){return(0,e.wg)(),(0,e.iD)("div",null,t)}]])}}]);