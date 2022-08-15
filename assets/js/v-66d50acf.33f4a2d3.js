"use strict";(self.webpackChunkvuepress_theme_knzn=self.webpackChunkvuepress_theme_knzn||[]).push([[3815],{3638:(s,n,a)=>{a.r(n),a.d(n,{data:()=>e});const e=JSON.parse('{"key":"v-66d50acf","path":"/c65fc02026c6e0bbedc939733c23389b/","title":"18 类型别名和字面量类型—单调的类型","lang":"zh-CN","frontmatter":{"permalink":"/c65fc02026c6e0bbedc939733c23389b/","title":"18 类型别名和字面量类型—单调的类型","author":"前端程序猿","tags":["typescript"],"categories":["大前端"],"postImage":"/images/typescript.webp"},"excerpt":"<p>本小节我们来学习类型别名和字面量类型。类型别名我们之前在讲泛型的时候接触过，现在来详细学习下</p>\\n","headers":[{"level":2,"title":"1 类型别名","slug":"_1-类型别名","children":[]},{"level":2,"title":"2. 字面量类型","slug":"_2-字面量类型","children":[{"level":3,"title":"(1) 字符串字面量类型","slug":"_1-字符串字面量类型","children":[]},{"level":3,"title":"(2) 数字字面量类型","slug":"_2-数字字面量类型","children":[]}]},{"level":2,"title":"本节小结","slug":"本节小结","children":[]}],"git":{"updatedTime":1660295074000,"contributors":[{"name":"zhi.li","email":"zhi.li@xjsd.com","commits":1}]},"filePathRelative":"TypeScript学习笔记/18-Type-aliases-and-literal-types—monotone-types.md"}')},49:(s,n,a)=>{a.r(n),a.d(n,{default:()=>o});var e=a(6252);const p=[(0,e.uE)('<p>本小节我们来学习类型别名和字面量类型。类型别名我们之前在讲泛型的时候接触过，现在来详细学习下</p><blockquote><p>学习从来无捷径，循序渐进登高峰。 —— 高永祚</p></blockquote><h2 id="_1-类型别名" tabindex="-1"><a class="header-anchor" href="#_1-类型别名" aria-hidden="true">#</a> 1 类型别名</h2><p>类型别名就是给一种类型起个别的名字，之后只要使用这个类型的地方，都可以用这个名字作为类型代替，但是它只是起了一个名字，并不是创建了一个新类型。这种感觉就像 JS 中对象的赋值，你可以把一个对象赋给一个变量，使用这个对象的地方都可以用这个变量代替，但你并不是创建了一个新对象，而是通过引用来使用这个对象。</p><p>我们来看下怎么定义类型别名，使用 type 关键字：</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">TypeString</span> <span class="token operator">=</span> <span class="token builtin">string</span>\n<span class="token keyword">let</span> str<span class="token operator">:</span> TypeString\nstr <span class="token operator">=</span> <span class="token number">123</span> <span class="token comment">// error Type &#39;123&#39; is not assignable to type &#39;string&#39;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>类型别名也可以使用泛型，来看例子：</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">PositionType<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token punctuation">{</span> x<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">;</span> y<span class="token operator">:</span> <span class="token constant">T</span> <span class="token punctuation">}</span>\n<span class="token keyword">const</span> position1<span class="token operator">:</span> PositionType<span class="token operator">&lt;</span><span class="token builtin">number</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span>\n  x<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n  y<span class="token operator">:</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span>\n<span class="token keyword">const</span> position2<span class="token operator">:</span> PositionType<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span>\n  x<span class="token operator">:</span> <span class="token string">&#39;right&#39;</span><span class="token punctuation">,</span>\n  y<span class="token operator">:</span> <span class="token string">&#39;top&#39;</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用类型别名时也可以在属性中引用自己：</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Child<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>\n  current<span class="token operator">:</span> <span class="token constant">T</span>\n  child<span class="token operator">?</span><span class="token operator">:</span> Child<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">let</span> ccc<span class="token operator">:</span> Child<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span>\n  current<span class="token operator">:</span> <span class="token string">&#39;first&#39;</span><span class="token punctuation">,</span>\n  child<span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token comment">// error</span>\n    current<span class="token operator">:</span> <span class="token string">&#39;second&#39;</span><span class="token punctuation">,</span>\n    child<span class="token operator">:</span> <span class="token punctuation">{</span>\n      current<span class="token operator">:</span> <span class="token string">&#39;third&#39;</span><span class="token punctuation">,</span>\n      child<span class="token operator">:</span> <span class="token string">&#39;test&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 这个地方不符合type，造成最外层child处报错</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是要注意，只可以在对象属性中引用类型别名自己，不能直接使用，比如下面这样是不对的：</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Child</span> <span class="token operator">=</span> Child<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token comment">// error 类型别名“Child”循环引用自身</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>另外要注意，因为类型别名只是为其它类型起了个新名字来引用这个类型，所以当它为接口起别名时，不能使用 extends 和 implements 。</p><p>接口和类型别名有时可以起到同样作用，比如下面这个例子：</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Alias</span> <span class="token operator">=</span> <span class="token punctuation">{</span>\n  num<span class="token operator">:</span> <span class="token builtin">number</span>\n<span class="token punctuation">}</span>\n<span class="token keyword">interface</span> <span class="token class-name">Interface</span> <span class="token punctuation">{</span>\n  num<span class="token operator">:</span> <span class="token builtin">number</span>\n<span class="token punctuation">}</span>\n<span class="token keyword">let</span> _alias<span class="token operator">:</span> Alias <span class="token operator">=</span> <span class="token punctuation">{</span>\n  num<span class="token operator">:</span> <span class="token number">123</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span>\n<span class="token keyword">let</span> _interface<span class="token operator">:</span> Interface <span class="token operator">=</span> <span class="token punctuation">{</span>\n  num<span class="token operator">:</span> <span class="token number">321</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span>\n_alias <span class="token operator">=</span> _interface\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到用类型别名和接口都可以定义一个只包含 num 属性的对象类型，而且类型是兼容的。那么什么时候用类型别名，什么时候用接口呢？可以通过两点来选择</p><ul><li>当你定义的类型要用于拓展，即使用 implements 等修饰符时，用接口。</li><li>当无法通过接口，并且需要使用联合类型或元组类型，用类型别名</li></ul><h2 id="_2-字面量类型" tabindex="-1"><a class="header-anchor" href="#_2-字面量类型" aria-hidden="true">#</a> 2. 字面量类型</h2><p>字面量类型其实比较基础，但是它又不适合放到基本类型里讲，因为字符串字面量类型和字符串类型其实并不一样，所以接下来我们来学习两种字面量类型。</p><h3 id="_1-字符串字面量类型" tabindex="-1"><a class="header-anchor" href="#_1-字符串字面量类型" aria-hidden="true">#</a> (1) 字符串字面量类型</h3><p>字符串字面量类型其实就是字符串常量，与字符串类型不同的是它是具体的值。</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Name</span> <span class="token operator">=</span> <span class="token string">&#39;Lison&#39;</span>\n<span class="token keyword">const</span> name1<span class="token operator">:</span> Name <span class="token operator">=</span> <span class="token string">&#39;test&#39;</span> <span class="token comment">// error 不能将类型“&quot;test&quot;”分配给类型“&quot;Lison&quot;”</span>\n<span class="token keyword">const</span> name2<span class="token operator">:</span> Name <span class="token operator">=</span> <span class="token string">&#39;Lison&#39;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你还可以使用联合类型来使用多个字符串：</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Direction</span> <span class="token operator">=</span> <span class="token string">&#39;north&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;east&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;south&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;west&#39;</span>\n<span class="token keyword">function</span> <span class="token function">getDirectionFirstLetter</span><span class="token punctuation">(</span>direction<span class="token operator">:</span> Direction<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> direction<span class="token punctuation">.</span><span class="token function">substr</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n<span class="token function">getDirectionFirstLetter</span><span class="token punctuation">(</span><span class="token string">&#39;test&#39;</span><span class="token punctuation">)</span> <span class="token comment">// error 类型“&quot;test&quot;”的参数不能赋给类型“Direction”的参数</span>\n<span class="token function">getDirectionFirstLetter</span><span class="token punctuation">(</span><span class="token string">&#39;east&#39;</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-数字字面量类型" tabindex="-1"><a class="header-anchor" href="#_2-数字字面量类型" aria-hidden="true">#</a> (2) 数字字面量类型</h3><p>另一个字面量类型就是数字字面量类型，它和字符串字面量类型差不多，都是指定类型为具体的值。</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">Age</span> <span class="token operator">=</span> <span class="token number">18</span>\n<span class="token keyword">interface</span> <span class="token class-name">Info</span> <span class="token punctuation">{</span>\n  name<span class="token operator">:</span> <span class="token builtin">string</span>\n  age<span class="token operator">:</span> Age\n<span class="token punctuation">}</span>\n<span class="token keyword">const</span> info<span class="token operator">:</span> Info <span class="token operator">=</span> <span class="token punctuation">{</span>\n  name<span class="token operator">:</span> <span class="token string">&#39;Lison&#39;</span><span class="token punctuation">,</span>\n  age<span class="token operator">:</span> <span class="token number">28</span><span class="token punctuation">,</span> <span class="token comment">// error 不能将类型“28”分配给类型“18”</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里补充一个比较经典的逻辑错误，来看例子：</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">getValue</span><span class="token punctuation">(</span>index<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">!==</span> <span class="token number">0</span> <span class="token operator">||</span> index <span class="token operator">!==</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// error This condition will always return &#39;true&#39; since the types &#39;0&#39; and &#39;1&#39; have no overlap</span>\n    <span class="token comment">// ...</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个例子中，在判断逻辑处使用了 || 符，当 index !== 0 不成立时，说明 index 就是 0，则不应该再判断 index 是否不等于 1；而如果 index !== 0 成立，那后面的判断也不会再执行；所以这个地方会报错。</p><h2 id="本节小结" tabindex="-1"><a class="header-anchor" href="#本节小结" aria-hidden="true">#</a> 本节小结</h2><p>本小节我们学习了类型别名和字面量类型，类型别名就是给一个类型起个别名，以后我们可以使用类型别名将较为复杂的类型抽离出来，这样任何需要使用这个类型的地方都可以使用这个别名代替；使用类型别名的好处有时和使用变量一样，我们可以将复杂的逻辑判断语句赋给一个变量，然后再进行判断，只需要判断这个变量的 true 或 false 即可；我们使用类型别名也可以起到简化代码的作用。我们还学习了两种字面量类型：数字字面量类型和字符串字面量类型，它们都是使用具体的字面量值来作为一种类型，所以我们叫它单调类型。</p><p>下个小节我们将学习可辨识联合类型，我们可以使用可辨识联合并保证每个 case 都被处理。</p>',33)],t={},o=(0,a(3744).Z)(t,[["render",function(s,n){return(0,e.wg)(),(0,e.iD)("div",null,p)}]])}}]);