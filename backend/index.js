import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import crypto from "crypto";

const app = express();
app.use(bodyParser.json());
app.use(cors());


class Block {
  constructor(index, timestamp, data, prevHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data; 
    this.prevHash = prevHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return crypto
      .createHash("sha256")
      .update(
        this.index +
          this.timestamp +
          JSON.stringify(this.data) +
          this.prevHash
      )
      .digest("hex");
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, Date.now(), {
      farmer: "Genesis",
      crop: "-",
      quantity: "-",
      location: "-",
    });
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.prevHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }
}

const agroChain = new Blockchain();

app.get("/chain", (req, res) => {
  res.json({ chain: agroChain.chain });
});

app.post("/add", (req, res) => {
  const { farmer, crop, quantity, location } = req.body;
  const newBlock = new Block(
    agroChain.chain.length,
    Date.now(),
    { farmer, crop, quantity, location },
    agroChain.getLatestBlock().hash
  );
  agroChain.addBlock(newBlock);
  res.json({ message: "Block added", block: newBlock });
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
