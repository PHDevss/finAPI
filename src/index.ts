import express, { NextFunction, Request, Response } from "express";
import { Account, AccountProps } from "./models/Account";
import { StatementProps, Statement } from "./models/Statement";

const PORT = 3000;
const app = express();

const customers: AccountProps[] = [];

app.use(express.json());

function verifyIfExistsAccountCPF(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const { cpf } = request.headers;
    const customer = customers.find((customer) => customer.cpf === cpf);

    if (!customer)
        return response.status(400).json({ error: "customer not found." });

    request.customer = customer;

    return next();
}

function verifyIfAmountExistsAndIsValid(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const { amount } = request.body;

    if (isNaN(amount) || amount <= 0)
        return response.status(400).json({ error: "Invalid amount" });

    request.body.amount = parseFloat(amount);
    return next();
}

app.post("/account", (req, res) => {
    const { cpf, name }: AccountProps = req.body;
    const customerAlreadyExists = customers.some(
        (costumer) => costumer.cpf === cpf
    );
    if (!cpf) {
        return res.status(400).json({ error: "Costumer not defined" });
    }
    if (customerAlreadyExists) {
        return res.status(400).json({ error: "Costumer already exists!" });
    }

    const account = new Account(cpf, name);

    customers.push(account);

    return res.status(201).send();
});

app.post(
    "/deposit",
    verifyIfExistsAccountCPF,
    verifyIfAmountExistsAndIsValid,
    (req, res) => {
        const { description = "Deposit", amount } = req.body;
        const date = new Date();

        const { customer } = req;

        const statementOperation = new Statement(
            description,
            amount,
            date,
            "credit"
        );
        customer.statement.push(statementOperation);

        return res.status(201).send();
    }
);

app.post(
    "/withdraw",
    verifyIfExistsAccountCPF,
    verifyIfAmountExistsAndIsValid,
    (req, res) => {
        const { description = "Saque", amount } = req.body;

        const { customer } = req;

        const balance = customer.getBalance();

        if (amount > balance) {
            return res.json({
                error: "Amount requerid is more than current balance",
            });
        } else {
            const date = new Date();

            const statementOperation = new Statement(
                description,
                -amount,
                date,
                "deposit"
            );
            customer.statement.push(statementOperation);

            return res.status(201).send();
        }
    }
);

app.get("/statement", verifyIfExistsAccountCPF, (req, res) => {
    return res.json(req.customer.statement);
});

app.get("/statement/date", verifyIfExistsAccountCPF, (req, res) => {
    const { customer } = req;
    const { date } = req.query;

    const dateFormat = new Date(date + " 00:00");

    function compareDates(statement: StatementProps) {
        return (
            statement.created_at.toDateString() ===
            new Date(dateFormat).toDateString()
        );
    }

    const statementCustom = customer.statement.filter(compareDates);

    return res.json(statementCustom);
});

app.get("/account", verifyIfExistsAccountCPF, (req, res) => {
    const { customer } = req;

    return res.json(customer);
});

app.get("/balance", verifyIfExistsAccountCPF, (req, res) => {
    const { customer } = req;

    const balance = customer.getBalance();

    res.json(balance);
});

app.put("/account", verifyIfExistsAccountCPF, (req, res) => {
    const { name } = req.body;
    const { customer } = req;

    if (name) {
        customer.name = name;

        return res.status(201).send();
    } else {
        return res.status(400).send({ error: "Missing name" });
    }
});

app.delete("/account", verifyIfExistsAccountCPF, (req, res) => {
    const { customer } = req;
    const indexOfCostumerDeleted = customers.indexOf(customer);

    customers.splice(indexOfCostumerDeleted, 1);
    return res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`🚀 Aplicação iniciada com sucesso na porta ${PORT}`);
});
