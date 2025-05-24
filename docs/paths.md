# Paths

Each page and post on the site has an associated path that should be reachable via search engines such as Google. These paths should be as simple as possible, while avoiding the possibility of collisions.

All paths are appended to the base URL `https://paradoxinversion.com`.

## A note about slugs

The final endpoint for the majority of CMS resources will be a slugified version fo the resource's title field.

> Care should be taken to ensure no collisions occur due to title fields that may match. Generally resources of the same type should not have the same slug, except in the case of standard posts.

## Page Paths

**Path format:** `https://paradoxinversion.com/page/[page-slug]`

Pages have the simplest paths. Because there may be other resources at `https://paradoxinversion.com/[whatever]`, the page's slug should be appended to `/page/`. 

Page slugs **must** always be unique to avoid collisions.

> At the moment there is no concept of a 'sub-page' ie, a page availabling at `/page/[page-slug]/[sub-page-slug]`, but consideration should be given to the possibility.

## Post Paths

### Standalone Posts

**Path Format:** `https://paradoxinversion.com/post/[year]/[month]/[day]/[post-slug]`

Posts that are not part of a series are formatted by their year, month, day, and post slug. 

Because standard post paths are so specific, it is possible that standard posts **may** share the same slug/title, however, this will also likely introduce the possibility of confusion and should be still be avoided where possible.

### Series Posts

**Path Format:** `https://paradoxinversion.com/series/[series-slug]/[post-slug]`

Posts that are part of a series are formatted by their series slug and post slug. Ideally, this format makes it simple to reason about a given series post's endpoint given the slugs. 

Posts in the same series should never have the same slug/title, however posts in **different** series **may** have the same slug/title.