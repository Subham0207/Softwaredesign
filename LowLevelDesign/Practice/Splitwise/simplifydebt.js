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