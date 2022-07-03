abstract class BaseRepo<Entity> {

    protected abstract getModel();

    public async create( entity: Entity ): Promise<Entity> {

        const modelInstance = this.getModel();

        const record: Entity = await modelInstance.create( entity );

        return record;
    };

    public async findOneById( id: number ) {
        return ( await this.getModel().findOne( { id: id } ) );
    }

    protected async conditionalFindOne( conditionObj ) {
        return ( await this.getModel().findOne( conditionObj ) );
    };

    protected async findAll( conditionObj ) {
        return ( await this.getModel().findAll( conditionObj ) );
    };

    protected async updateOne( updatedObj: Entity, conditionObj  ) {
        return ( await this.getModel().updateOne( updatedObj, conditionObj ) );
    };

    protected async updateMany( updatedObj: Entity, conditionObj ) {
        return ( await this.getModel().updateMany( updatedObj, conditionObj ) );
    };

    protected async deleteOne( conditionObj ) {
        return ( await this.getModel().deleteOne( conditionObj ) );
    };

    protected async deleteMany( conditionObj ) {
        return ( await this.getModel().updateMany( conditionObj ) );
    };
};

export default BaseRepo;