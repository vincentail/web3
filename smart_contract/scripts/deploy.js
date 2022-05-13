const main = async() => {

    // We get the contract to deploy
    const Transaction = await hre.ethers.getContractFactory("Transactions");
    const transaction = await Transaction.deploy();

    await transaction.deployed();

    console.log("Transactions deployed to:", transaction.address);
}

const runMain = async() => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.ext(1);
    }
}

runMain();