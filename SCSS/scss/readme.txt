BEM guidelines
http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/
http://getbem.com/introduction/
.block__element--modifiers

Only use BEM where SCOPE is required

modifiers = state (is-open/is-closed): hidden/expanded, open/closed, active/inactive, large/small, success/error
modifiers indicate a javascript dependency

Use SMACSS submodule pattern when modifying particular cases of a module
o-filters__select--last
o-filters__select--featured


http://www.sitepoint.com/working-bem-scale-advice-top-developers/

.person {}
  .person__head {}
    .person__face {}
      .person__eye {}
        .person__pupil {}




http://frontendbabel.info/articles/bem-with-css-preprocessors/

.block {
  &__element {
    &_modifier {
      // styles for a modifier of an element
    }
    &_modifier_value {
      // do not split modifier key and value
    }
    &:hover {
      // pseudo-class is also a kind of a modifier
    }
  }
}


LESS (and now SASS as well) allow to use & within a single class name. There is no strict requirements on what should be the symbols before and after &. Thus, you can produce simple selectors instead of cascades.

.header {
  &__link {
    &, &:hover, &:focus {
      color: white;
      text-decoration: none;
    }
  }
}
CSS:

.header__link,
.header__link:hover,
.header__link:focus {
  color: white;
  text-decoration: none;
}
The same goes for selectors of elements and modifiers.

.header {
  background: white;
  &__title {
    font: bold 24px/1 sans-serif;
    &_featured {
      font-size: 30px;
    }
  }
}
CSS:

.header {
  background: white;
}
.header__title {
  font: bold 24px/1 sans-serif;
}
.header__title_featured {
  font-size: 30px;
}