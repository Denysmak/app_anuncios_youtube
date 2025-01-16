import { useEffect, useState } from 'react';
import Header from './Header';
import Navbar from  './Navbar.jsx';

function TelaPrincipal() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail'); // Recupera o e-mail salvo
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  return (
    <div>
      <Header email={email}/>
      <div className="content" style={{marginTop:'100px'}}>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim felis ac ligula ultricies tincidunt. Morbi ante felis, aliquam id augue efficitur, rutrum varius lorem. Curabitur et ex suscipit, interdum lorem eu, efficitur elit. Pellentesque nisi leo, accumsan nec laoreet eget, rutrum vel odio. Nulla accumsan euismod lobortis. Sed dapibus euismod massa, in consectetur elit consequat eget. Maecenas nisi tellus, suscipit non metus eu, dignissim varius leo. Sed vel posuere odio. Integer ut pretium augue, at viverra nisl. Sed sem est, feugiat vitae augue vitae, mattis posuere velit. Ut vitae convallis purus, id tempus est.

sapien sit amet, molestie felis. Vivamus rhoncus at leo quis tristique. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam sit amet viverra dui. Sed vel nunc sed neque faucibus porta. Integer molestie rutrum mi non varius. Aliquam eget arcu vel purus aliquam luctus.

Mauris in dapibus sapien. In hac habitasse platea dictumst. Sed vestibulum accumsan nunc, nec facilisis dui fermentum vitae. Aliquam erat volutpat. Aliquam ullamcorper, ligula id blandit mattis, ex neque accumsan lectus, vitae pharetra metus arcu ut ligula. Donec pharetra, magna porta placerat volutpat, ipsum mauris suscipit elit, sed scelerisque nisl elit quis felis. In venenatis tempus elit, nec scelerisque metus eleifend in. In hac habitasse platea dictumst. Suspendisse potenti. Duis non ornare arcu. Integer et ante tempor, commodo massa vel, dictum enim. Praesent eget lectus odio. Fusce tincidunt vehicula odio quis elementum. Proin nisl erat, tristique pellentesque blandit id, pretium et purus. Morbi vulputate orci et risus interdum fringilla.

Praesent in nunc hendrerit, fringilla mauris ac, pharetra ligula. Cras varius magna ante, vel dignissim libero ullamcorper in. Suspendisse vehicula sem sit amet libero fringilla, vel ultrices tellus malesuada. Nunc non turpis efficitur lacus tristique rutrum ac ac purus. Sed ut lacus volutpat, consectetur lectus ac, tincidunt sapien. Praesent mattis ultrices convallis. Donec fermentum risus et aliquet molestie. Duis mattis consectetur scelerisque. Nam consequat lorem sed massa imperdiet aliquet.

Fusce risus massa, porta ut urna eget, facilisis gravida risus. Cras semper bibendum placerat. Nam scelerisque egestas enim sit amet sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque lacinia tristique velit ut euismod. Donec neque mi, euismod sed tempus sed, elementum a est. Sed tristique iaculis sapien, nec tristique tortor commodo vel. Aliquam tempus tempus nulla, a efficitur odio egestas vel. Donec quam arcu, ultrices vitae pharetra pretium, viverra et metus. Pellentesque tincidunt et ante interdum scelerisque. Maecenas placerat tristique ligula. Nunc accumsan consectetur fringilla. Proin hendrerit suscipit luctus. Fusce viverra lorem at nibh laoreet ultricies. Sed egestas, augue at convallis porta, dui libero eleifend magna, eu ultrices risus est sit amet turpis.

Nunc nunc leo, venenatis id sollicitudin at, rutrum sed est. Curabitur ut diam et velit commodo lacinia. Suspendisse porta porta tellus vel fermentum. Curabitur vel viverra tortor, sed mattis tortor. Pellentesque porttitor ante eget nisi accumsan, quis aliquet metus dictum. Curabitur imperdiet odio at leo egestas, in viverra arcu egestas. Vestibulum a consequat purus. Integer rutrum sodales eleifend. Sed facilisis velit elit, eu placerat mauris lobortis vitae.

Nam pulvinar magna quis elementum bibendum. Suspendisse accumsan, nibh id feugiat ultrices, lacus nibh tristique libero, in vestibulum diam augue in turpis. Sed nec rhoncus purus. Proin non elit fringilla nisi ornare egestas. Praesent elementum diam sit amet nisl facilisis, nec finibus mi ullamcorper. Duis efficitur tortor ut pharetra laoreet. Nullam et nisi consequat, feugiat arcu sed, scelerisque odio. Mauris vel mauris dolor. Duis quis ullamcorper quam, a tristique risus. Aliquam ullamcorper pulvinar blandit. Maecenas posuere, odio fringilla porttitor venenatis, eros lectus molestie erat, ac facilisis sapien tortor ultricies sapien. Curabitur luctus maximus lacus vel ultrices. Vestibulum ac rhoncus magna, non viverra arcu.

Suspendisse potenti. Nam vel placerat nulla, rhoncus accumsan ex. Sed ut enim tempor, convallis ipsum sit amet, varius urna. Nunc orci lorem, vestibulum quis blandit at, rutrum ac ipsum. Etiam iaculis quam sed leo varius, vehicula dignissim est vestibulum. Nam imperdiet orci euismod, porttitor purus sed, ultrices est. Aliquam lacus felis, iaculis malesuada felis non, hendrerit volutpat lacus. Sed quis lorem semper, sagittis turpis et, semper turpis. Proin non pretium mauris, sed maximus velit. Suspendisse in sapien ac magna maximus ornare. Morbi velit urna, consequat eget pellentesque sit amet, dapibus eu risus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dignissim felis ac ligula ultricies tincidunt. Morbi ante felis, aliquam id augue efficitur, rutrum varius lorem. Curabitur et ex suscipit, interdum lorem eu, efficitur elit. Pellentesque nisi leo, accumsan nec laoreet eget, rutrum vel odio. Nulla accumsan euismod lobortis. Sed dapibus euismod massa, in consectetur elit consequat eget. Maecenas nisi tellus, suscipit non metus eu, dignissim varius leo. Sed vel posuere odio. Integer ut pretium augue, at viverra nisl. Sed sem est, feugiat vitae augue vitae, mattis posuere velit. Ut vitae convallis purus, id tempus est.

sapien sit amet, molestie felis. Vivamus rhoncus at leo quis tristique. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam sit amet viverra dui. Sed vel nunc sed neque faucibus porta. Integer molestie rutrum mi non varius. Aliquam eget arcu vel purus aliquam luctus.

Mauris in dapibus sapien. In hac habitasse platea dictumst. Sed vestibulum accumsan nunc, nec facilisis dui fermentum vitae. Aliquam erat volutpat. Aliquam ullamcorper, ligula id blandit mattis, ex neque accumsan lectus, vitae pharetra metus arcu ut ligula. Donec pharetra, magna porta placerat volutpat, ipsum mauris suscipit elit, sed scelerisque nisl elit quis felis. In venenatis tempus elit, nec scelerisque metus eleifend in. In hac habitasse platea dictumst. Suspendisse potenti. Duis non ornare arcu. Integer et ante tempor, commodo massa vel, dictum enim. Praesent eget lectus odio. Fusce tincidunt vehicula odio quis elementum. Proin nisl erat, tristique pellentesque blandit id, pretium et purus. Morbi vulputate orci et risus interdum fringilla.

Praesent in nunc hendrerit, fringilla mauris ac, pharetra ligula. Cras varius magna ante, vel dignissim libero ullamcorper in. Suspendisse vehicula sem sit amet libero fringilla, vel ultrices tellus malesuada. Nunc non turpis efficitur lacus tristique rutrum ac ac purus. Sed ut lacus volutpat, consectetur lectus ac, tincidunt sapien. Praesent mattis ultrices convallis. Donec fermentum risus et aliquet molestie. Duis mattis consectetur scelerisque. Nam consequat lorem sed massa imperdiet aliquet.

Fusce risus massa, porta ut urna eget, facilisis gravida risus. Cras semper bibendum placerat. Nam scelerisque egestas enim sit amet sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque lacinia tristique velit ut euismod. Donec neque mi, euismod sed tempus sed, elementum a est. Sed tristique iaculis sapien, nec tristique tortor commodo vel. Aliquam tempus tempus nulla, a efficitur odio egestas vel. Donec quam arcu, ultrices vitae pharetra pretium, viverra et metus. Pellentesque tincidunt et ante interdum scelerisque. Maecenas placerat tristique ligula. Nunc accumsan consectetur fringilla. Proin hendrerit suscipit luctus. Fusce viverra lorem at nibh laoreet ultricies. Sed egestas, augue at convallis porta, dui libero eleifend magna, eu ultrices risus est sit amet turpis.

Nunc nunc leo, venenatis id sollicitudin at, rutrum sed est. Curabitur ut diam et velit commodo lacinia. Suspendisse porta porta tellus vel fermentum. Curabitur vel viverra tortor, sed mattis tortor. Pellentesque porttitor ante eget nisi accumsan, quis aliquet metus dictum. Curabitur imperdiet odio at leo egestas, in viverra arcu egestas. Vestibulum a consequat purus. Integer rutrum sodales eleifend. Sed facilisis velit elit, eu placerat mauris lobortis vitae.

Nam pulvinar magna quis elementum bibendum. Suspendisse accumsan, nibh id feugiat ultrices, lacus nibh tristique libero, in vestibulum diam augue in turpis. Sed nec rhoncus purus. Proin non elit fringilla nisi ornare egestas. Praesent elementum diam sit amet nisl facilisis, nec finibus mi ullamcorper. Duis efficitur tortor ut pharetra laoreet. Nullam et nisi consequat, feugiat arcu sed, scelerisque odio. Mauris vel mauris dolor. Duis quis ullamcorper quam, a tristique risus. Aliquam ullamcorper pulvinar blandit. Maecenas posuere, odio fringilla porttitor venenatis, eros lectus molestie erat, ac facilisis sapien tortor ultricies sapien. Curabitur luctus maximus lacus vel ultrices. Vestibulum ac rhoncus magna, non viverra arcu.

Suspendisse potenti. Nam vel placerat nulla, rhoncus accumsan ex. Sed ut enim tempor, convallis ipsum sit amet, varius urna. Nunc orci lorem, vestibulum quis blandit at, rutrum ac ipsum. Etiam iaculis quam sed leo varius, vehicula dignissim est vestibulum. Nam imperdiet orci euismod, porttitor purus sed, ultrices est. Aliquam lacus felis, iaculis malesuada felis non, hendrerit volutpat lacus. Sed quis lorem semper, sagittis turpis et, semper turpis. Proin non pretium mauris, sed maximus velit. Suspendisse in sapien ac magna maximus ornare. Morbi velit urna, consequat eget pell</p>
      </div>
    <Navbar/>
    </div>
  );
}

export default TelaPrincipal;
