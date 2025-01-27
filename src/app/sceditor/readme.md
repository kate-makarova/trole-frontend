This is a very basic adoptation of [SCE Editor](https://www.sceditor.com/) for Angular.  
The module loads the scripts from CDN asynchronously, they are not integrated into the build.  


To render a field a text area in the SCE Editor mode, first include the module:

```js
@Component({
selector: 'app-...',
imports: [
...
SceditorComponent
],
})
```

then include the component in your template. Pass an id and the desired format:
```html
<app-sceditor
[format]="'bbcode'"
[id]="'postEditor'"
></app-sceditor>
```
Available formats: 'bbcode' and 'xhtml'.

Finally, on form submit, get the value from the editor and put it in your form value:

```js
  onSubmit()
{

    const content = SCEditorModule.getValue('postEditor')
    this.postForm.patchValue({content: content})

    console.log(this.postForm.value);
}
```
