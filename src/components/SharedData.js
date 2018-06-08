export default class SharedData
{
    static __Storage = {}
    static __LastKey = ''

    static initStorage( Key )
    {
        SharedData.__Storage[Key] = {}
        SharedData.__LastKey = Key
    }

    static switchToKey( Key )
    {
        if ( Key in SharedData.__Storage )
        {
            SharedData.__LastKey = Key
            return true
        }
        else
        {
            return false;
        }
    }

    static hasKey( Key )
    {
        return Key in SharedData.__Storage
    }

    static set( Value )
    {
        if ( SharedData.__LastKey in SharedData.__Storage )
        {
            SharedData.__Storage[SharedData.__LastKey] = Value;
            return true
        }
        else
        {
            return false
        }
    }

    static get()
    {
        if ( SharedData.__LastKey in SharedData.__Storage )
        {
            return SharedData.__Storage[SharedData.__LastKey];
        }
        else
        {
            return 
        }
    }
}

