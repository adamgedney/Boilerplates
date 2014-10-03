Boilerplates for: 
    Angular Projects
    Laravel Projects
    Node prjects
    Grunt Sass Projects
    Simple HTML Projects




    Git Shortcuts:

    //Remove staged commits
    git stash save --keep-index



    //Remove large files from commit cache
    git filter-branch -f --index-filter "git rm -rf --cached --ignore-unmatch sites.zip" -- --all


    //Calculate slider percentage (Backward from 100)
    aps.percentage = Math.floor(((range.trRight - range.trLeft) - (range.thX - range.trLeft)) / (range.trRight - range.trLeft) * 100);