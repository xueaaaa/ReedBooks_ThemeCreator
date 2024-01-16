const formElement = document.getElementById('form'); 
formElement.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(formElement);

  const internal = formData.get('internal'); 
  const display = formData.get('display'); 
  const author = formData.get('author');

  const bg = formData.get('bg-color');
  const cont = formData.get('cont-bg-color');
  const book_bg = formData.get('book-bg-color');
  const accent = formData.get('accent-color');
  const text = formData.get('text-color');
  const hint = formData.get('hint-color');
  const danger = formData.get('danger-color');


  let info_json = {
    name: internal,
    display: display,
    author: author
  };
  info_json = JSON.stringify(info_json)

  let theme = `<ResourceDictionary xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
                                   xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
                    <SolidColorBrush x:Key="window_background_color">${bg.valueOf()}</SolidColorBrush>
                    <SolidColorBrush x:Key="container_background_color">${cont.valueOf()}</SolidColorBrush>
                    <SolidColorBrush x:Key="book_background_color">${book_bg.valueOf()}</SolidColorBrush>
                    <SolidColorBrush x:Key="accent_color">${accent.valueOf()}</SolidColorBrush>
                    <SolidColorBrush x:Key="text_color">${text.valueOf()}</SolidColorBrush>
                    <SolidColorBrush x:Key="hint_color">${hint.valueOf()}</SolidColorBrush>
                    <SolidColorBrush x:Key="danger_color">${danger.valueOf()}</SolidColorBrush>
                </ResourceDictionary>`;

  let zip = new JSZip();
  zip.file('info.json', info_json)
  zip.file(`${internal}.theme.xaml`, theme)

  zip.generateAsync({type:"blob"}).then(function(content) {
    var aa = document.getElementById("aa")
    aa.className = ''
    aa.href =  URL.createObjectURL(content)
    aa.download = `${internal}.rbtheme`
 });
});