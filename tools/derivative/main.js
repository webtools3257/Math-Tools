let mj = null

function derivative(expr,variable){
	const d = math.derivative(expr, variable)
	return d 
}

function addScript(path){
	let scriptTag = document.createElement("script")
	scriptTag.src = path
	document.body.appendChild(scriptTag)
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
		element.element.innerHTML = '';
		element.element.appendChild(mj(latex));
	}
	catch (err) {}
}

window.Turtle.createComponent("tool-display", {
	render: function() {
		return `
			<div class="p-10">
				<h1>Calculate the derivative</h1>
				<div class="field">
					<label class="form-label">Input expression</label>
					<input ref="expr" class="form-input" style="min-width: 250px; width: 90%;">
				</div>
				<button ref="calc" class="btn btn-success">Calc</button>
				<br>
				<div>
					<h3>Result</h3>
					<span ref="result">---</span>
				</div>
			</div>
		`
	},
	onRender: function() {
		let expr = this.ref("expr").val
		console.log(expr)
		let ctx = this
		this.ref("calc").on("click",function(){
			let r = derivative(expr,"x")
			toLatex(ctx.ref("result"),r)
		})
	}
})

export async function initTool(arg) {
	addScript("https://unpkg.com/mathjs@11.8.1/lib/browser/math.js")
	addScript("https://polyfill.io/v3/polyfill.min.js?features=es6")
	addScript("https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js")
	mj = function(tex) {
		return MathJax.tex2svg(tex, { em: 16, ex: 6, display: false });
	}
}