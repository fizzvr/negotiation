class ProxyFactory {

  static create(objeto, props, acao){

    return new Proxy(objeto, {

      get(target, prop, receiver) {
          if(props.includes(prop) && ProxyFactory.ehfuncao(target[prop])){

          return function(){

            console.log(`Interceptando ${prop}`);
            Reflect.apply(target[prop], target, arguments);
            return acao(target);//pensa como o this do objeto sendo passado
          };
        }
        return Reflect.get(target, prop, receiver);
      },

        set(target, prop, value, receiver){
            if(props.includes(prop)){
                console.log('entrou no set');
                acao(target);
            }
            return Reflect.set(target, prop, value, receiver);
        }
    });
  }

  static ehfuncao(f){
      return (typeof (f) == typeof(Function));
  }
}
