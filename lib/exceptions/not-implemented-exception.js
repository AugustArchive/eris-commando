const getMessage = (constructor, func) => `Constructor ${constructor} hasn't implemented the ${func} function!`;

module.exports = class NotImplementedException extends Error
{
    constructor(constructor, func)
    {
        super(getMessage(constructor, func));

        this.name = 'NotImplementedException';
    }
}