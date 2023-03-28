let a = ['a','b','c','d','e','f','g','h','i'];

let temp = [];
let final = [];

function split(arr){
    if (arr.length == 1){
        temp.push(arr[0]);
        final.push(temp);
        temp = [];
    } else {
        let random = Math.floor(Math.random() * arr.length);
        temp.push(arr[random]);
        arr.splice(random , 1)
        if(temp.length == 5){
            final.push(temp)
            temp = [];
        }
        split(arr);
    }
};

split(a);
console.log(final);