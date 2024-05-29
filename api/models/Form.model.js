import mongoose from 'mongoose';


const Form1Schema = new mongoose.Schema({
  ItemsN: {
      type: String,
      required: true
  },
  price: {
      type: Number,
      required: true
  },
  quantity: {
      type: Number,
      required: true
  }
});






const Form1 = mongoose.model('Form1', Form1Schema);

export default Form1;