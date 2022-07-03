class Validators {

    queryObjHasProperties( queryObj ): boolean {

        return !!( Object.keys( queryObj ).length );
    };
};

export default ( new Validators() );