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
    const index = this.hashMod(key)
    if (this.data[index]) throw new Error('hash collision or same key/value pair already exists!');
    else {
      this.data[index] = new KeyValuePair(key, value)
      this.count++
    }
  }

  insertWithHashCollisions(key, value) {
    // Your code here
    const index = this.hashMod(key)
    const newPair = new KeyValuePair(key, value)

    if (this.data[index]) {
      const oldPairs = this.data[index]
      newPair.next = oldPairs
      this.data[index] = newPair
    } else {
      this.data[index] = newPair
    }

    this.count++
  }

  insert(key, value) {
    const index = this.hashMod(key)
    const newPair = new KeyValuePair(key, value)
    let current = this.data[index]
  
    if (!current) {
      this.data[index] = newPair
      this.count++
    } else {
      let nothingChanged = true
      while (current) {
        if (key === current.key) {
          current.value = value
          nothingChanged = false
          break
        }
        current = current.next
      }
  
      if (nothingChanged) {
        newPair.next = this.data[index]
        this.data[index] = newPair
        this.count++
      }
    }
  }
  

}


module.exports = HashTable;