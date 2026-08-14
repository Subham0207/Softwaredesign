function simplifyDebt(edges)
{
    const balancedMap = new Map();

    for(let [from, to, amount] of edges)
    {
        balancedMap.set(from, (balancedMap.get(from) || 0) - amount);
        balancedMap.set(to, (balancedMap.get(to) || 0) + amount);
    }

    const debtors = [];
    const credtiors = [];

    for(let [person, balance] of balancedMap)
    {
        if(balance < 0)
            debtors.push([person,-balance]);
        else
            credtiors.push([person, balance]);
    }

    const result = [];
    let i =0;
    let j = 0;

    while(i < debtors.length && j < credtiors.length)
    {
        const [debtor, debtorAmount] = debtors[i];
        const [creditor, creditorAmount] = credtiors[j];

        const settledAmount = Math.min(debtorAmount, creditorAmount);
        
        result.push([debtor, creditor, settledAmount]);

        debtors[i][1] -= settledAmount;
        credtiors[j][1] -= settledAmount;

        if( debtors[i][1] === 0) i++;
        if( credtiors[j][1] === 0) j++;
    }

    return result;

}

const edges = [
    ["A", "B", 100],
    ["A", "C", 50],
    ["B", "C", 30],
    ["C", "D", 20]
];

console.log(simplifyDebt(edges));