import Emitter from "events";

class EventEmitter {

    emitterInstance: Emitter;
    
    createEmitterInstance() {
        this.emitterInstance = new Emitter();
    };

    getEmitterInstance() {
        
        if ( !this.emitterInstance ) {
            this.createEmitterInstance();
        }

        return this.emitterInstance;
    };
};

export default ( new EventEmitter() );