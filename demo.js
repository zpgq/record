

const [count, setCount] = useTest()

function useTest () {
    const setCount = null;
    console.log(setCount);
    return [count, setCount]
}

setCount = function () {

}