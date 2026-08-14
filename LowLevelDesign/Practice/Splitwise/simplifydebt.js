//[from, to, amount]
function simplifyDebt(edges)
{
    const balanceMap = new Map();
    for(let [from, to, amount] of edges)
    {
        balanceMap.set(from, (balanceMap.get(from) || 0) - amount);        
        balanceMap.set(to, (balanceMap.get(to) || 0) + amount);
    }

    const debtors = [];
    const creditors = [];

    for(let [person, balance] of balanceMap)
    {
        if(balance < 0)
            debtors.push([person, -balance]);
        else if(balance > 0)
            creditors.push([person, balance]);
    }

    const result = [];
    let i = 0, j = 0;
    while(i < debtors.length && j < creditors.length)
    {
        const [debtor, debtAmount] = debtors[i];
        const [creditor, creditAmount] = creditors[j];

        const settledAmount = Math.min(debtAmount, creditAmount);
        result.push([debtor, creditor, settledAmount]);

        debtors[i][1] -= settledAmount;
        creditors[j][1] -= settledAmount;

        if(debtors[i][1] === 0) i++;
        if(creditors[j][1] === 0) j++;
    }

    return result;
}

// A owes B
const edges = [
    ["A", "B", 100],
    ["A", "C", 50],
    ["B", "C", 30],
    ["C", "D", 20]
];

console.log(simplifyDebt(edges));


// while loop with example 
// debtors => i = 0 [A, 150]
// creditors => j = 0 [B, 70]

// A gives B 70; so settled amount is 70

// subtract settled amount from both A and B

// Either i or j will move
// if A debt cleared move i to next debtor;
// if B fully paid, move j to next creditor;