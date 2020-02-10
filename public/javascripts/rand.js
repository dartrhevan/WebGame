
export default function rand(max = 100, min = 0) {
    return min + Math.round(Math.random() * (max - min));
}
