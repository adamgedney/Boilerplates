BEM guidelines
http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/
.block__element--modifiers

Only use BEM where SCOPE is required

modifiers = state (is-open/is-closed): hidden/expanded, open/closed, active/inactive, large/small, success/error
modifiers indicate a javascript dependency

Use SMACSS submodule pattern when modifying particular cases of a module
o-filters__select--last o-filters__select--featured