import { Option, Some,None, Result, Ok, Err } from "../../src/index";

describe('Option', () => {
    it('should return instance of Some', () => {
        const some:Option<string> = new Some('some');
        expect(some.isSome()).toBe(true);
        expect(some.isNone()).toBe(false);
        expect(some.unwrap()).toBe('some');
    });
});

describe('Option', () => {
    it('should return instance of None', () => {
        const none:Option<string> = new None();
        expect(none.isNone()).toBe(true);
        expect(none.isSome()).toBe(false);  
        try{
            none.unwrap();
        }catch(e){
            expect(e).toBeDefined();
        }
    });
});

describe('Result', () => {
    it('should return instance of Ok', () => {
        const ok:Result<string,Error> = new Ok('ok');
        expect(ok.isOk()).toBe(true);
        expect(ok.isErr()).toBe(false);

        expect(ok.unwrap()).toBe('ok');
    });
});

describe('Result', () => {
    it('should return instance of Err', () => {
        const err:Result<string,Error> = new Err<string,Error>( new Error('error'));

        expect(err.isErr()).toBe(true);
        expect(err.isOk()).toBe(false);
        expect(err.error).toBeDefined();
        try{
            err.unwrap();
        }catch(e){
            expect(e).toBeDefined();
        }
        
    });
});

