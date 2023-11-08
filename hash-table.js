const sha256 = require('js-sha256');

class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {

  constructor(numBuckets = 4) {
    // Your code here
    this.numBuckets = numBuckets
    this.data = new Array(numBuckets).fill(null)
    this.capacity = this.data.length
    this.count = 0
  }

  hash(key) {
    // Your code here
    const sha = sha256(key).slice(0, 8)
    return parseInt(sha, 16)
  }

  hashMod(key) {
    // Your code here
    const sha = this.hash(key)
    return sha % this.capacity
  }

  insertNoCollisions(key, value) {
    // Your code here
  }

  insertWithHashCollisions(key, value) {
    // Your code here
  }

  insert(key, value) {
    // Your code here
  }

}


module.exports = HashTable;