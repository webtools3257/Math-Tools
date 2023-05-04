const expr = document.getElementById('expr')
const pretty = document.getElementById("pretty")
const variable = document.getElementById('variable')
const btn = document.getElementById("btn-solve")
const result = document.getElementById('result')
let parenthesis = 'keep'
let implicit = 'hide'

async function calc() {
	try {
		let e = math.derivative(expr.value, variable.value)
		return e
	} catch (e) {
		throw e
	}
}

btn.onclick = function() {
	result.innerHTML = `<div class="circle-loader" style="margin:0 auto;"></div>`;
	calc()
		.then((res) => {
			expr.parentElement.classList.remove("form-invaild")
			expr.parentElement.classList.add("form-success")
			displayMathExpression(pretty, `derivative(${expr.value},${variable.value})`)
			displayMathExpression(result, res.toString())
		})
		.catch(err => {
			expr.parentElement.classList.add("form-invaild")
			expr.parentElement.classList.remove("form-success")
			result.innerHTML = '#Error';
			pretty.innerHTML ="#Error"
		})
}

