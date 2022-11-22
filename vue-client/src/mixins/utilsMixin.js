export default {
    methods: {
        deepCopyArray(array) {
            return JSON.parse(JSON.stringify(array));
        },
        deepCopyObj(obj) {
            return JSON.parse(JSON.stringify(obj));
        }
    }
}