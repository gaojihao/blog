"use strict";(self.webpackChunkvuepress_theme_knzn=self.webpackChunkvuepress_theme_knzn||[]).push([[4874],{1855:(n,s,a)=>{a.r(s),a.d(s,{data:()=>p});const p=JSON.parse('{"key":"v-5953ceb8","path":"/7a38cb54be902811fe8d07db448a008d/","title":"10 JS 对象的方法补充","lang":"zh-CN","frontmatter":{"permalink":"/7a38cb54be902811fe8d07db448a008d/","title":"10 JS 对象的方法补充","author":"前端程序猿","tags":["javascript"],"categories":["大前端"],"postImage":"/images/javascript.webp"},"excerpt":"","headers":[{"level":2,"title":"hasOwnProperty","slug":"hasownproperty","children":[]},{"level":2,"title":"in/for in 操作符","slug":"in-for-in-操作符","children":[]},{"level":2,"title":"instanceof","slug":"instanceof","children":[{"level":3,"title":"isPrototypeOf","slug":"isprototypeof","children":[]}]}],"git":{"updatedTime":1660295074000,"contributors":[{"name":"zhi.li","email":"zhi.li@xjsd.com","commits":1}]},"filePathRelative":"深入理解JavaScript/10-JS-object-oriented-supplement.md"}')},3180:(n,s,a)=>{a.r(s),a.d(s,{default:()=>o});var p=a(6252);const e=[(0,p.uE)('<h2 id="hasownproperty" tabindex="-1"><a class="header-anchor" href="#hasownproperty" aria-hidden="true">#</a> hasOwnProperty</h2><p>对象是否有某一个属于自己的属性（不是在原型上的属性）</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;why&#39;</span><span class="token punctuation">,</span>\n  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">var</span> info <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token punctuation">{</span>\n  <span class="token literal-property property">address</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;北京市&#39;</span><span class="token punctuation">,</span>\n    <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n<span class="token comment">// hasOwnProperty方法判断</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>info<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span><span class="token string">&#39;address&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// true</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>info<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span><span class="token string">&#39;name&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// false</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="in-for-in-操作符" tabindex="-1"><a class="header-anchor" href="#in-for-in-操作符" aria-hidden="true">#</a> in/for in 操作符</h2><p>判断某个属性是否在某个对象或者对象的原型上</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// in 操作符: 不管在当前对象还是原型中返回的都是true</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;address&#39;</span> <span class="token keyword">in</span> info<span class="token punctuation">)</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;name&#39;</span> <span class="token keyword">in</span> info<span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// for in</span>\n<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> key <span class="token keyword">in</span> info<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span> <span class="token comment">// address name age</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="instanceof" tabindex="-1"><a class="header-anchor" href="#instanceof" aria-hidden="true">#</a> instanceof</h2><p>用于检测构造函数的 pototype，是否出现在某个实例对象的原型链上</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">createObject</span><span class="token punctuation">(</span><span class="token parameter">o</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">function</span> <span class="token function">Fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n  <span class="token class-name">Fn</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> o\n  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">function</span> <span class="token function">inheritPrototype</span><span class="token punctuation">(</span><span class="token parameter">SubType<span class="token punctuation">,</span> SuperType</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token class-name">SubType</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token function">createObject</span><span class="token punctuation">(</span><span class="token class-name">SuperType</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span>\n  Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span><span class="token class-name">SubType</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> <span class="token string">&#39;constructor&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n    <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n    <span class="token literal-property property">configurable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n    <span class="token literal-property property">writable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n    <span class="token literal-property property">value</span><span class="token operator">:</span> SubType<span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n\n<span class="token keyword">function</span> <span class="token function">Student</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n\n<span class="token function">inheritPrototype</span><span class="token punctuation">(</span>Student<span class="token punctuation">,</span> Person<span class="token punctuation">)</span>\n\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token class-name">Person</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>__proto__<span class="token punctuation">)</span> <span class="token comment">// Object.prototype</span>\n\n<span class="token keyword">var</span> stu <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>stu <span class="token keyword">instanceof</span> <span class="token class-name">Student</span><span class="token punctuation">)</span> <span class="token comment">// true</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>stu <span class="token keyword">instanceof</span> <span class="token class-name">Person</span><span class="token punctuation">)</span> <span class="token comment">// true</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>stu <span class="token keyword">instanceof</span> <span class="token class-name">Object</span><span class="token punctuation">)</span> <span class="token comment">// true</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="isprototypeof" tabindex="-1"><a class="header-anchor" href="#isprototypeof" aria-hidden="true">#</a> isPrototypeOf</h3><p>用于检测某个对象，是否出现在某个实例对象的原型链上</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n\n<span class="token keyword">var</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token class-name">Person</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">isPrototypeOf</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// true</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;why&#39;</span><span class="token punctuation">,</span>\n  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">var</span> info <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>\n\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span><span class="token function">isPrototypeOf</span><span class="token punctuation">(</span>info<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// true</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>',14)],t={},o=(0,a(3744).Z)(t,[["render",function(n,s){return(0,p.wg)(),(0,p.iD)("div",null,e)}]])}}]);