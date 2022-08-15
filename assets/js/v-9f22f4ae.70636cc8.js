"use strict";(self.webpackChunkvuepress_theme_knzn=self.webpackChunkvuepress_theme_knzn||[]).push([[7182],{3873:(n,s,a)=>{a.r(s),a.d(s,{data:()=>t});const t=JSON.parse('{"key":"v-9f22f4ae","path":"/a26e1a82fb377ff8c4987435c2fd1e1c/","title":"20 this 类型","lang":"zh-CN","frontmatter":{"permalink":"/a26e1a82fb377ff8c4987435c2fd1e1c/","title":"20 this 类型","author":"前端程序猿","tags":["typescript"],"categories":["大前端"],"postImage":"/images/typescript.webp"},"excerpt":"<p>在 JavaScript 中，this 可以用来获取对全局对象、类实例对象、构建函数实例等的引用，在 TypeScript 中，this 也是一种类型，我们先来看个计算器 Counter 的例子：</p>\\n","headers":[{"level":2,"title":"每个人都是自己命运的主宰。 ——斯蒂尔斯","slug":"每个人都是自己命运的主宰。-——斯蒂尔斯","children":[]},{"level":2,"title":"本节小结","slug":"本节小结","children":[]}],"git":{"updatedTime":1660295074000,"contributors":[{"name":"zhi.li","email":"zhi.li@xjsd.com","commits":1}]},"filePathRelative":"TypeScript学习笔记/20-this-type.md"}')},8783:(n,s,a)=>{a.r(s),a.d(s,{default:()=>o});var t=a(6252);const p=[(0,t.uE)('<p>在 JavaScript 中，this 可以用来获取对全局对象、类实例对象、构建函数实例等的引用，在 TypeScript 中，this 也是一种类型，我们先来看个计算器 Counter 的例子：</p><h2 id="每个人都是自己命运的主宰。-——斯蒂尔斯" tabindex="-1"><a class="header-anchor" href="#每个人都是自己命运的主宰。-——斯蒂尔斯" aria-hidden="true">#</a> 每个人都是自己命运的主宰。 ——斯蒂尔斯</h2><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">class</span> <span class="token class-name">Counter</span> <span class="token punctuation">{</span>\n  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token keyword">public</span> count<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n  <span class="token function">add</span><span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// 定义一个相加操作的方法</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>count <span class="token operator">+=</span> value\n    <span class="token keyword">return</span> <span class="token keyword">this</span>\n  <span class="token punctuation">}</span>\n  <span class="token function">subtract</span><span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// 定义一个相减操作的方法</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>count <span class="token operator">-=</span> value\n    <span class="token keyword">return</span> <span class="token keyword">this</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n<span class="token keyword">let</span> counter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Counter</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>\n<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>counter<span class="token punctuation">.</span>count<span class="token punctuation">)</span> <span class="token comment">// 10</span>\ncounter<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">subtract</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>\n<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>counter<span class="token punctuation">.</span>count<span class="token punctuation">)</span> <span class="token comment">// 13</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们给 Counter 类定义几个方法，每个方法都返回 this，这个 this 即指向实例，这样我们就可以通过链式调用的形式来使用这些方法。这个是没有问题的，但是如果我们要通过类继承的形式丰富这个 Counter 类，添加一些方法，依然返回 this，然后采用链式调用的形式调用，在过去版本的 TypeScript 中是有问题的，先来看我们继承的逻辑：</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">class</span> <span class="token class-name">PowCounter</span> <span class="token keyword">extends</span> <span class="token class-name">Counter</span> <span class="token punctuation">{</span>\n  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token keyword">public</span> count<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">super</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n  <span class="token function">pow</span><span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// 定义一个幂运算操作的方法</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>count <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>count <span class="token operator">**</span> value\n    <span class="token keyword">return</span> <span class="token keyword">this</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n<span class="token keyword">let</span> powcounter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PowCounter</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>\npowCounter<span class="token punctuation">.</span><span class="token function">pow</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">subtract</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>\n<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>powCounter<span class="token punctuation">.</span>count<span class="token punctuation">)</span> <span class="token comment">// 6</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们定义了 PowCounter 类，它继承 Counter 类，新增了 pow 方法用来求值的幂次方，这里我们使用了 ES7 新增的幂运算符 <code>**</code>。我们使用 PowCounter 创建了实例 powcounter，它的类型自然是 PowCounter，在该实例上调用继承来的 subtract 和 add 方法。如果是在过去，就会报错，因为创建实例 powcounter 的类 PowCounter 没有定义这两个方法，所以会报没有这两个方法的错误。但是在 1.7 版本中增加了 this 类型，TypeScript 会对方法返回的 this 进行判断，就不会报错了。</p><p>对于对象来说，对象的属性值可以是一个函数，那么这个函数也称为方法，在方法内如果访问 this，默认情况下是对这个对象的引用，this 类型也就是这个对象的字面量类型，如下</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token comment">// 例3.7.1</span>\n<span class="token keyword">let</span> info <span class="token operator">=</span> <span class="token punctuation">{</span>\n  name<span class="token operator">:</span> <span class="token string">&#39;Lison&#39;</span><span class="token punctuation">,</span>\n  <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token comment">// &quot;Lison&quot; 这里this的类型为 { name: string; getName(): string; }</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是如果显式地指定了 this 的类型，那么 this 的类型就改变了，如下：</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token comment">// 例3.7.2</span>\n<span class="token keyword">let</span> info <span class="token operator">=</span> <span class="token punctuation">{</span>\n  name<span class="token operator">:</span> <span class="token string">&#39;Lison&#39;</span><span class="token punctuation">,</span>\n  <span class="token function">getName</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token operator">:</span> <span class="token punctuation">{</span> age<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span> <span class="token comment">// 这里的this的类型是{ age: number }</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们在 tsconfig.json 里将 noImplicitThis 设为 true，这时候有两种不同的情况：</p><ul><li>(1) 对象字面量具有 <code>ThisType&lt;T&gt;</code>指定的类型，此时 this 的类型为 T，来看例子</li></ul><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">ObjectDescriptor<span class="token operator">&lt;</span><span class="token constant">D</span><span class="token punctuation">,</span> <span class="token constant">M</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token comment">// 使用类型别名定义一个接口，这里用了泛型，两个泛型变量D和M</span>\n  data<span class="token operator">?</span><span class="token operator">:</span> <span class="token constant">D</span> <span class="token comment">// 这里指定data为可选字段，类型为D</span>\n  <span class="token comment">// 这里指定methods为可选字段，类型为M和ThisType&lt;D &amp; M&gt;组成的交叉类型；</span>\n  <span class="token comment">// ThisType是一个内置的接口，用来在对象字面量中键入this，这里指定this的类型为D &amp; M</span>\n  methods<span class="token operator">?</span><span class="token operator">:</span> <span class="token constant">M</span> <span class="token operator">&amp;</span> ThisType<span class="token operator">&lt;</span><span class="token constant">D</span> <span class="token operator">&amp;</span> <span class="token constant">M</span><span class="token operator">&gt;</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">// 这里定义一个mackObject函数，参数desc的类型为ObjectDescriptor&lt;D, M&gt;</span>\n<span class="token keyword">function</span> <span class="token generic-function"><span class="token function">makeObject</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">D</span><span class="token punctuation">,</span> <span class="token constant">M</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>desc<span class="token operator">:</span> ObjectDescriptor<span class="token operator">&lt;</span><span class="token constant">D</span><span class="token punctuation">,</span> <span class="token constant">M</span><span class="token operator">&gt;</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token constant">D</span> <span class="token operator">&amp;</span> <span class="token constant">M</span> <span class="token punctuation">{</span>\n  <span class="token keyword">let</span> data<span class="token operator">:</span> object <span class="token operator">=</span> desc<span class="token punctuation">.</span>data <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n  <span class="token keyword">let</span> methods<span class="token operator">:</span> object <span class="token operator">=</span> desc<span class="token punctuation">.</span>methods <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n  <span class="token comment">// 这里通过...操作符，将data和methods里的所有属性、方法都放到了同一个对象里返回，这个对象的类型自然就      是D &amp; M，因为他同时包含D和M两个类型的字段</span>\n  <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token operator">...</span>data<span class="token punctuation">,</span> <span class="token operator">...</span>methods <span class="token punctuation">}</span> <span class="token keyword">as</span> <span class="token constant">D</span> <span class="token operator">&amp;</span> <span class="token constant">M</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token function">makeObject</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  data<span class="token operator">:</span> <span class="token punctuation">{</span> x<span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> y<span class="token operator">:</span> <span class="token number">0</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 这里data的类型就是我们上面定义ObjectDescriptor&lt;D, M&gt;类型中的D</span>\n  methods<span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token comment">// 这里methods的类型就是我们上面定义ObjectDescriptor&lt;D, M&gt;类型中的M</span>\n    <span class="token function">moveBy</span><span class="token punctuation">(</span>dx<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> dy<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">this</span><span class="token punctuation">.</span>x <span class="token operator">+=</span> dx <span class="token comment">// 所以这里的this是我们通过ThisType&lt;D &amp; M&gt;指定的，this的类型就是D &amp; M</span>\n      <span class="token keyword">this</span><span class="token punctuation">.</span>y <span class="token operator">+=</span> dy\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n\nobj<span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token number">10</span>\nobj<span class="token punctuation">.</span>y <span class="token operator">=</span> <span class="token number">20</span>\nobj<span class="token punctuation">.</span><span class="token function">moveBy</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>不包含 <code>ThisType&lt;T&gt;</code> 指定的上下文类型，那么此时 this 具有上下文类型，也就是普通的情况。你可以试着把上面使用了 <code>ThisType&lt;T&gt;</code> 的例子中，<code>ObjectDescriptor&lt;D, M&gt;</code>类型中指定 methods 的类型中的 &amp; <code>ThisType&lt;D &amp; M&gt;</code> 去掉，你会发现 moveBy 方法中 this.x 和 this.y 报错了，因为此时 this 的类型是 methods 这个对象字面量的类型。</li></ul><h2 id="本节小结" tabindex="-1"><a class="header-anchor" href="#本节小结" aria-hidden="true">#</a> 本节小结</h2><p>本小节我们学习了 this 类型的相关知识，我们通过计数器的例子，学习了在 1.7 版本之后，编译器对有继承行为的类中 this 的类型的推断。还学习了对于对象的方法中，this 指向的相关知识。更多的关于 this 类型的知识，可以看一下这个 PR 中的介绍及例子，这里面完整地写了 this 的类型的规则。不过我们上面都举例学习了，总结一下：</p><p>如果该方法具有显式声明的此参数，则该参数具有该参数的类型，也就是我们刚刚讲的例 3.7.2； 否则，如果该方法由具有此参数的签名进行上下文类型化，则该参数具有该参数的类型，也就是我们讲的例 3.7.1； 否则，如果在 tsconfig.json 里将 noImplicitThis 设为 true，且包含的对象文字具有包含 <code>ThisType&lt;T&gt;</code> 的上下文类型，则其类型为 T，例子看我们讲的第(1)小点.</p><p>否则，如果启用了 --noImplicitThis 并且包含的对象文字具有不包含 <code>ThisType&lt;T&gt;</code> 的上下文类型，则它具有上下文类型，具体看我们讲的第(2)小点。</p><p>否则，this 的类型为 any 任何类型。</p><p>下个小节我们将学习索引类型，这里说的索引类型，并不是前面我们讲接口的时候，给接口中字段名设置类型，我们将学习获取索引类型和索引值类型。</p>',20)],e={},o=(0,a(3744).Z)(e,[["render",function(n,s){return(0,t.wg)(),(0,t.iD)("div",null,p)}]])}}]);