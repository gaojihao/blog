"use strict";(self.webpackChunkvuepress_theme_knzn=self.webpackChunkvuepress_theme_knzn||[]).push([[7369],{9938:(n,s,a)=>{a.r(s),a.d(s,{data:()=>e});const e=JSON.parse('{"key":"v-43870b30","path":"/f79d10f69ea68efbbfe1738916d7eff9/","title":"06 JS 额外知识补充","lang":"zh-CN","frontmatter":{"permalink":"/f79d10f69ea68efbbfe1738916d7eff9/","title":"06 JS 额外知识补充","author":"前端程序猿","tags":["javascript"],"categories":["大前端"],"postImage":"/images/javascript.webp"},"excerpt":"","headers":[{"level":2,"title":"with 语句","slug":"with-语句","children":[]},{"level":2,"title":"eval 函数","slug":"eval-函数","children":[]},{"level":2,"title":"认识严格模式","slug":"认识严格模式","children":[]},{"level":2,"title":"开启严格模式","slug":"开启严格模式","children":[]},{"level":2,"title":"严格模式限制","slug":"严格模式限制","children":[]}],"git":{"updatedTime":1660295074000,"contributors":[{"name":"zhi.li","email":"zhi.li@xjsd.com","commits":1}]},"filePathRelative":"深入理解JavaScript/06-JS-additional-knowledge-supplement.md"}')},8507:(n,s,a)=>{a.r(s),a.d(s,{default:()=>i});var e=a(6252);const p=[(0,e.uE)('<h2 id="with-语句" tabindex="-1"><a class="header-anchor" href="#with-语句" aria-hidden="true">#</a> with 语句</h2><p>with 语句: 可以形成自己的作用域</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;why&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">,</span> <span class="token literal-property property">message</span><span class="token operator">:</span> <span class="token string">&#39;obj message&#39;</span> <span class="token punctuation">}</span>\n\n<span class="token keyword">with</span> <span class="token punctuation">(</span>info<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>严格模式，不允许使用 with 语句</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token string">&#39;use strict&#39;</span>\n\n<span class="token keyword">var</span> info <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;kobe&#39;</span> <span class="token punctuation">}</span>\n<span class="token keyword">with</span> <span class="token punctuation">(</span>info<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment">// 严格模式下不允许使用 &quot;with&quot; 语句。</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不建议使用 with 语句，因为它可能是混淆错误和兼容性问题的根源。</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;why&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">,</span> <span class="token literal-property property">message</span><span class="token operator">:</span> <span class="token string">&#39;obj message&#39;</span> <span class="token punctuation">}</span>\n\n<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">var</span> message <span class="token operator">=</span> <span class="token string">&#39;Hello World&#39;</span>\n  <span class="token keyword">with</span> <span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="eval-函数" tabindex="-1"><a class="header-anchor" href="#eval-函数" aria-hidden="true">#</a> eval 函数</h2><p>eval 是一个特殊的函数，它可以将传入的字符串当做 JavaScript 代码来运行。</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">var</span> jsString <span class="token operator">=</span> <span class="token string">&#39;var message = &quot;Hello World&quot;; console.log(message);&#39;</span>\n\n<span class="token keyword">var</span> message <span class="token operator">=</span> <span class="token string">&#39;aa&#39;</span>\n\n<span class="token function">eval</span><span class="token punctuation">(</span>jsString<span class="token punctuation">)</span>\n\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span> <span class="token comment">// Hello World</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不建议在开发中使用 eval：</p><ul><li>eval 代码的可读性非常的差（代码的可读性是高质量代码的重要原则）；</li><li>eval 是一个字符串，那么有可能在执行的过程中被刻意篡改，那么可能会造成被攻击的风险；</li><li>eval 的执行必须经过 JS 解释器，不能被 JS 引擎优化；</li></ul><h2 id="认识严格模式" tabindex="-1"><a class="header-anchor" href="#认识严格模式" aria-hidden="true">#</a> 认识严格模式</h2><p>在 ECMAScript5 标准中，JavaScript 提出了严格模式的概念（Strict Mode）：</p><p>严格模式很好理解，是一种具有限制性的 JavaScript 模式，从而使代码隐式的脱离了 ”懒散（sloppy）模式“；支持严格模式的浏览器在检测到代码中有严格模式时，会以更加严格的方式对代码进行检测和执行；</p><p>严格模式对正常的 JavaScript 语义进行了一些限制：</p><ul><li>严格模式通过 抛出错误 来消除一些原有的 静默（silent）错误；</li><li>严格模式让 JS 引擎在执行代码时可以进行更多的优化（不需要对一些特殊的语法进行处理）；</li><li>严格模式禁用了在 ECMAScript 未来版本中可能会定义的一些语法；</li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// 静默错误</span>\n<span class="token boolean">true</span><span class="token punctuation">.</span>foo <span class="token operator">=</span> <span class="token string">&#39;abc&#39;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="开启严格模式" tabindex="-1"><a class="header-anchor" href="#开启严格模式" aria-hidden="true">#</a> 开启严格模式</h2><p>那么如何开启严格模式呢？严格模式通过在文件或者函数开头使用 use strict 来开启。</p><p>严格模式支持粒度化的迁移：</p><p>可以支持在 js 文件中开启严格模式；</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// &quot;use strict&quot;</span>\n\n<span class="token boolean">true</span><span class="token punctuation">.</span>foo <span class="token operator">=</span> <span class="token string">&#39;abc&#39;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也支持对某一个函数开启严格模式；</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token string">&#39;use strict&#39;</span>\n\n  <span class="token boolean">true</span><span class="token punctuation">.</span>foo <span class="token operator">=</span> <span class="token string">&#39;abc&#39;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="严格模式限制" tabindex="-1"><a class="header-anchor" href="#严格模式限制" aria-hidden="true">#</a> 严格模式限制</h2><p>这里我们来说几个严格模式下的严格语法限制：</p><p>JavaScript 被设计为新手开发者更容易上手，所以有时候本来错误语法，被认为也是可以正常被解析的；但是这种方式可能给带来留下来安全隐患；在严格模式下，这种失误就会被当做错误，以便可以快速的发现和修正；</p><ol><li>无法意外的创建全局变量</li><li>严格模式会使引起静默失败的赋值操作抛出异常</li><li>严格模式下试图删除不可删除的属性</li><li>严格模式不允许函数参数有相同的名称</li><li>不允许 0 开头表示的八进制语法, <code>0o</code> ES6 的新写法支持</li><li>在严格模式下，不允许使用 with</li><li>在严格模式下，eval 不再为上层引用变量</li><li>严格模式下，this 默认绑定为 <code>undefined</code></li></ol><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token string">&#39;use strict&#39;</span>\n<span class="token comment">// 禁止意外创建全局变量</span>\nmessage <span class="token operator">=</span> <span class="token string">&#39;Hello World&#39;</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token string">&#39;use strict&#39;</span>\n<span class="token comment">// 不允许函数有相同的参数名称</span>\n<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> x</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> x<span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n\n<span class="token function">foo</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token string">&#39;use strict&#39;</span>\n<span class="token comment">// 静默错误</span>\n<span class="token boolean">true</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&#39;abc&#39;</span>\n<span class="token number">NaN</span> <span class="token operator">=</span> <span class="token number">123</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token string">&#39;use strict&#39;</span>\n<span class="token comment">// 试图删除不可删除的属性</span>\n<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\nObject<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token string">&#39;name&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n  <span class="token literal-property property">configurable</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n  <span class="token literal-property property">writable</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n  <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;why&#39;</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>name<span class="token punctuation">)</span>\n<span class="token comment">// obj.name = &quot;kobe&quot;</span>\n\n<span class="token keyword">delete</span> obj<span class="token punctuation">.</span>name\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token string">&#39;use strict&#39;</span>\n<span class="token comment">// 不允许使用原先的八进制格式 0123</span>\n<span class="token keyword">var</span> num <span class="token operator">=</span> <span class="token number">0o123</span> <span class="token comment">// 八进制</span>\n<span class="token keyword">var</span> num2 <span class="token operator">=</span> <span class="token number">0x123</span> <span class="token comment">// 十六进制</span>\n<span class="token keyword">var</span> num3 <span class="token operator">=</span> <span class="token number">0b100</span> <span class="token comment">// 二进制</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>num<span class="token punctuation">,</span> num2<span class="token punctuation">,</span> num3<span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// eval函数不会向上引用变量了</span>\n<span class="token keyword">var</span> jsString <span class="token operator">=</span>\n  <span class="token string">&#39;&quot;use strict&quot;; var message = &quot;Hello World&quot;; console.log(message);&#39;</span>\n<span class="token function">eval</span><span class="token punctuation">(</span>jsString<span class="token punctuation">)</span>\n\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span> <span class="token comment">// Uncaught ReferenceError: message is not defined</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token string">&#39;use strict&#39;</span>\n\n<span class="token comment">// 在严格模式下, 自执行函数(默认绑定)会指向undefined</span>\n<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>',36)],t={},i=(0,a(3744).Z)(t,[["render",function(n,s){return(0,e.wg)(),(0,e.iD)("div",null,p)}]])}}]);