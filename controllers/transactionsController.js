import User from "../models/userModel";
import { body, validationResult, param } from "express-validator";

export const addTransaction = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { amount, transactionType, category, comment } = req.body;

    const user = await User.findById(req.user.id);

    const newTransaction = {
      amount,
      transactionType,
      category,
      comment,
    };

    await user.transactions.push(newTransaction);
    await user.save();

    return res
      .status(201)
      .json(user.transactions[user.transactions.length - 1]);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Error creating new Transaction" });
  }
};

// export const editTransaction = async (req, res) => {

//     try {

//         let Transaction = await TransactionTransaction
//             .findById(req.params.TransactionId)
//             .populate("user", "id")

//         if (!Transaction) {
//             return res.status(404).send({ error: "Transaction not found!" })
//         }

//         // console.log(req.user.id)
//         // console.log(Transaction.user.id)
//         // let hasAuthorization = Transaction.user.id == req.user.id
//         // if (!hasAuthorization) {
//         //     return res.status(401).json({ msg: "Permission denied." })
//         // }

//         Transaction = await TransactionTransaction.findByIdAndUpdate(
//             req.params.TransactionId,
//             { $set: req.body },
//             { new: true }
//         )

//         //  console.log(Transaction)
//         return res.status(200).json(Transaction)

//     } catch (error) {

//         console.log(error);
//         return res.status(500).send({ msg: "Server Error" })
//     }
// }

// export const deleteTransaction = async (req, res) => {

//     try {

//         let Transaction = await TransactionTransaction
//             .findById(req.params.TransactionId)

//         if (!Transaction) {
//             return res.status(404).send({ error: "Transaction not found!" })
//         }

//         await Transaction.remove(req.params.TransactionId)

//         //  console.log(Transaction)
//         return res.status(200).json({ msg: "Transaction deleted" })

//     } catch (error) {

//         console.log(error);
//         return res.status(500).send({ msg: "Server Error" })
//     }

// }

export const getTransaction = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findById(req.user.id);

    const transaction = await user.transactions.id(req.params.transactionId)

    if (!transaction) {
      return res.status(404).json({ msg: "Transaction not found"})
    }

    return res.status(200).json(transaction);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

// export const getAllTransactions = async (req, res) => {

//     // const id = JSON.parse(req.user.id)
//     // const ObjectId = new mongoose.ObjectId
//     // ObjectId.createFromHexString(req.user.id)

//     try {
//         let Transactions = await TransactionTransaction.find({
//             user: await User.findById(req.user.id)
//         });

//         //   console.log(Transactions)
//         res.json(Transactions)

//         // try {
//         //     const objectId = mongoose.Types.ObjectId
//         //     // const ObjectId = mongoose.Types.ObjectId
//         //     //  const filter = {userreq.user.id}
//         //     let Transactions = await TransactionTransaction.find({
//         //         user: await User.findById(req.user.id)
//         //     })

//         //     return res.json(Transactions)

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ msg: "Server Error" })
//     }
// }

export const validate = (method) => {
  switch (method) {
    case "addTransaction":
      return [
        body("transactionType")
          .exists()
          .not()
          .isEmpty()
          .isIn(["income", "expense"]),
        body("amount").exists().not().isEmpty(),
        body("category").exists().not().isEmpty(),
      ];
  }
};
