// interface Iapi<U> {
//     params: Promise<U>
// }

// function request(params: Iapi) {
//     console.log(params)
//     return params
// }

// const p1 = Promise.resolve('11');

// request(p1)

type Example = {
    age: number,
    name: string,
    isDate: boolean
};

// // const age: Example = {}

function person<T> (params: T) {
    return function <T>() {}
}

const newFunc = () => person<string>('11')

// interface IRes {
//     [key: string]: number
//     name: number
// }

// const arr: IRes = {
//     age: 111,
//     name: 222
// }
