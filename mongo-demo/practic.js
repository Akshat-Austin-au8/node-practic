// Using reference (normalization) -> consistency
let author = {
    name: 'Akshat'
}

let course = {
    author: 'id'
}

// Using enbedded Documents (Denormalization) -> performence

let course = {
    author: {
        name: 'Akshat'
    }
}

// Hybrid

let author = {
    name: 'Akshat'
    // 50 other properties
}

let course = {
    author: {
        id: 'ref',
        name: 'Akshat'
    }
}