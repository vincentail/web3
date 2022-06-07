// SPDX-License-Identifier:UNLICENCED

pragma solidity >=0.4.17 <0.9.0;

interface ERC20 {
    /***
     * 该函数读取代币合约中定义的代币名称。
     * 这里，定义代币名称可以提高代币合约的可用性，
     * 但不是代币合约必须定义的属性，但标准的ERC20合约都会定义。
     */
    function name() external view returns (string memory);

    /**
     * 返回代币合约中定义的代币符号，比如”BNB”。
     * 该函数读取代币合约中定义的代币符号。
     * 这里，定义代币符号可以提高代币合约的可用性，
     * 但不是代币合约必须定义的属性，但标准的ERC20合约都会定义。
     */
    function symbol() external view returns (string memory);

    /**
     * 返回代币合约中定义的代币的精度，比如18，表示代币的余额除以10^18后才是真正的代币数量。
     * 类似于以太的单位换算，余额10^18 Wei表示以太数量为1=10^18/10^18。
     */
    function decimals() external view returns (uint8);

    /**
     * 返回代币的总供应量。
     */
    function totalSupply() external view returns (uint256);

    /**
     * 返回地址为_owner的账户的代币余额。
     */
    function balanceOf(address _owner) external view returns (uint256 balance);

    /**
     * 将调用者账户中_value数量的代币转移到地址_to，并且必须触发Transfer事件。如果调用者的账户余额没有足够的代币可以支付_value数量的代币时，该函数应该抛出异常并回滚。
     * 注意：0值作为_value值传入到函数必须被视为正常的函数执行并触发Transfer事件。
     */
    function transfer(address _to, uint256 _value)
        external
        returns (bool success);

    /**
     * 将_value数量的代币从地址_from转移到地址_to，并且必须触发Transfer事件。
     * transferFrom方法用于提款流程，允许合约代表代币所有者账户转移代币。 例如，这可用于允许合约代表代币所有者转移代币和/或以次级货币（sub-currency）的形式收取费用。若函数调用者没有得到_from账户的授权，该函数则会抛出异常并回滚。
     * 注意：0值作为_value值传入到函数必须被视为正常的函数执行并触发Transfer事件。
     */
    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) external returns (bool success);

    /**
     * 该函数的调用者账户地址将_value数量的代币授权给_spender，或者更新授权的代币数量，即_spender可以多次提取调用者账户地址的代币，
     * 总数量不超过_value，每次提取的代币数量也不能超过调用者账户地址的代币余额，同时提取后会更新_value的值。
     * 如果在提取过程中，提取的代币数量超过了代币余额不足，该函数会抛出异常并回滚。
     */
    function approve(address _spender, uint256 _value)
        external
        returns (bool success);

    /**
     * 返回账户地址_spender还可以从账户地址_owner中提取的代币数量。
     */
    function allowance(address _owner, address _spender)
        external
        view
        returns (uint256 remaining);

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );
}
