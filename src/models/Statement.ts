export interface StatementProps {
    description :string;
    amount :number;
    created_at: Date;
    type: "credit" | "deposit";
}

export class Statement implements StatementProps{
    description :string;
    amount :number;
    created_at: Date;
    type: "credit" | "deposit";


    constructor(description: string, amount: number , created_at: Date,  type: "credit" | "deposit"){
        this.description= description
        this.amount = amount
        this.created_at = created_at
        this.type = type
        return (
            {
                description: this.description, 
                amount: this.amount, 
                created_at: this.created_at,
                type: this.type
            }
        )
    }
}