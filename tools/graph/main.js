let mj = null

function draw(expr,start = -10 ,stop=10,step=0.5) {
	let r_expr = expr
	expr = math.compile(expr)
	functionPlot({
		target: '#plot',
		data: [{
			fn: r_expr
	  }]
	})
	return expr
}

function parseExpr(expr) {
	try {
		let node = math.parse(expr.value)
		return node
	}
	catch (err) {}

}

function evalExpr(element, node) {
	element.element.innerHTML = math.format(node.compile().evaluate())
}

function toLatex(element, node) {
	try {
		let latex = ''
		latex = node.toTex({})
		MathJax.typesetClear();
		element.HTML = '';
		element.element.appendChild(mj(latex));
	}
	catch (err) {}
}

window.Turtle.createComponent("tool-display", {
	render: function() {
		return `
			<div class="p-10">
				<h1>Draw the graph of the function </h1>
				<div class="field">
					<label class="form-label">Input expression</label>
					<input ref="expr" type="text"  class="form-input" style="min-width: 250px; width: 90%;">
				</div>
				<button ref="draw" class="btn btn-success">Draw</button>
				<br>
				<div>
					<h3>Function</h3>
					<span ref="func" class="p-10">
						- - -
					</span>
				</div>
				<br>
				<div id="plot" style="max-width:98%;color:black; background:white;" ></div>
			</div>
		`
	},
	onRender: function() {
		let ctx = this
		this.ref("draw").on("click", function() {
			ctx.ref("func").HTML = `
				<div class="dot-loader">
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</div>
			`
			let expr = ctx.ref("expr").val
			let r = draw(expr)
			toLatex(ctx.ref("func"), r)
		})
	}
})

async function initTool(arg) {
	addScript("https://unpkg.com/function-plot/dist/function-plot.js")
	addScript("https://unpkg.com/mathjs@11.8.1/lib/browser/math.js")
	addScript("https://polyfill.io/v3/polyfill.min.js?features=es6")
	addScript("https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js")
	mj = function(tex) {
		return MathJax.tex2svg(tex, { em: 16, ex: 6, display: false });
	}
}

initTool()