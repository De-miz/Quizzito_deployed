
x = 'home/demiz/hi.png'
x = x.split('/')
x[x.length-1] = 'me.png'
x = x.join('/')
console.log(x)