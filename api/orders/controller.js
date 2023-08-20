const nodemailer = require("nodemailer");
var Mailgen = require('mailgen');
const { connect } = require("mongoose");
require('dotenv').config()
const Order = require('./models')

const demoMail = async (req, res) => {
    const { email, customerName } = req.body

    if (!email || !customerName) {
        res.status(403).json({ message: "Please Give Your email" })
    }

    else {

        const config = {
            service: "gmail",
            auth: {

                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASSWORD
            }

        }
        const transporter = nodemailer.createTransport(config);

        var mailGenerator = new Mailgen({
            theme: 'default',
            product: {
                // Appears in header & footer of e-mails
                name: 'Mailgen Banoqbil',
                link: 'https://mailgen.js/'
            }
        });

        var mailgenEmail = {
            body: {
                name: customerName,
                intro: 'Welcome to Mailgen! We\'re very excited to have you on board.',
                table: {
                    data: [
                        {
                            mame: customerName,
                            email: email,
                            token: "1234565"
                        }
                    ]

                },
                outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
            }
        };


        const response = {

            from: process.env.NODEMAILER_EMAIL, // sender address
            to: email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: mailGenerator.generate(mailgenEmail), // html body

        }



        try {
            await transporter.sendMail(response);
            res.json({ message: "Check Your Email" })
        }
        catch (error) {
            res.status(500).json({ error })
        }
    }


}


const createOrder = async (req, res) => {
    const { items, totaBill, address, customerContect, name, email } = req.body;
    if (!items.length || !address || !name || !email) {
        res.status(403).json({ message: "Invalid payload" });
    }
    else {
        try {
            await connect(process.env.MONGO_URL);
            const order = await Order.create({
                items,
                totaBill: 0,
                customerAddress: address,
                customerContect,
                customerName: name,
                customerEmail: email
            });

            // Email
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.NODEMAILER_EMAIL,
                    pass: process.env.NODEMAILER_PASSWORD
                }
            });


            // Mail Gen Setup

            var mailGenerator = new Mailgen({
                theme: 'default',
                product: {
                    // Appears in header & footer of e-mails
                    name: 'Mailgen Banoqbil',
                    link: 'https://mailgen.js/'
                }
            });

            await transporter.sendMail({

                from: process.env.NODEMAILER_EMAIL, // sender address
                to: email, // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: mailGenerator.generate({
                    body: {
                        name: name,
                        intro: 'Welcome to Bashi Sweets, we ensure best quality Sweets at  Your doorstep',
                        table: {
                            data: [
                                {
                                    mame: name,
                                    email: email,
                                    TrackingId: order._id,
                                    Address: address,
                                    Contact: customerContect
                                }
                            ]

                        },
                        outro: 'Please make sure the above mentioned  details  are correcrt, incase any mistake ,you  can  contact  us .'
                    }
                }), // html body

            });

            res.status(201).json({
                message: "Order Placed Successfully",
                TrackingId: order._id
            });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }




    }


};

const allOrders = async (req, res) => {

    try {
        await connect(process.env.MONGO_URL)
        const orders = await Order.find()
        res.json({ orders })
    }
    catch (error) {
        res.status(500).message({ message: error.message })
    }
}

const orderbyId = async (req, res) => {
    const { _id } = req.params
    try {
        await connect(process.env.MONGO_URL)
        const order = await Order.findOne({ _id })
        res.json({ order })
    }
    catch (error) {
        res.status(500).message({ message: error.message })
    }
}


module.exports = { demoMail, createOrder, orderbyId, allOrders }