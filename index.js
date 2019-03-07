class FactoryFloor {
    /**
     * @param {function} modelClass
     * @param {function} attributes
     */
    constructor(modelClass, attributes) {
        this.modelClass = modelClass;
        this.attributes = attributes;
    }

    /**
     * @param {number|undefined} count
     */
    set count(count) {
        this._count = count;
    }

    /**
     * @return {number}
     */
    get count() {
        return this._count || 1;
    }

    /**
     * @param {function|null} overrides
     * @return {Array}
     */
    make(overrides = null) {
        const models = [];

        for(let i=0; i < this.count; i++) {
            const data = this.attributes ? this.attributes(faker) : {};
            const resolvedOverrides = FactoryFloor.resolveOverrides(overrides);

            Object.assign(data, resolvedOverrides);

            models.push(new this.modelClass(data));
        }

        return this.count === 1 ? models.shift() : models;
    }

    /**
     * @param overrides
     * @return {function | {}}
     */
    static resolveOverrides(overrides){
        const data = overrides ? overrides(faker) : {};

        return Object.assign({}, data);
    }

    /**
     * @param {function} model
     * @return {FactoryFloor|undefined}
     */
    static getDefinition(model) {
        return new FactoryFloor(
            FactoryFloor._definitions[model.name].modelClass,
            FactoryFloor._definitions[model.name].attributes
        )
    }

    /**
     * @param {{modelClass: function, attributes:function}} definition
     */
    static set definition(definition) {
        FactoryFloor._definitions = FactoryFloor._definitions || {};

        FactoryFloor._definitions[definition.modelClass.name] = definition;
    }
}

const factoryDefine = (modelClass, attributes) => {
    FactoryFloor.definition = {modelClass, attributes};
};

const factory = (modelClass, count) => {
    const factory = FactoryFloor.getDefinition(modelClass);

    factory.count = count;

    return factory;
};
