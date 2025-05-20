# File and Folder Naming Inconsistencies

This document lists inconsistencies with the Angular style guide for file and folder naming in the Trole Frontend project.

## Folder Naming Inconsistencies

1. `src/app/services/breadcrubs` - This folder name is misspelled. According to the Angular style guide, it should be `breadcrumbs` (with an 'm' before the 's').

## File Naming Inconsistencies

1. `src/app/services/apiservice/apiservice.service.ts` - The feature name in this file does not follow kebab-case as recommended by the Angular style guide. It should be `api-service.service.ts`.
2. `src/app/services/apiservice/apiservice.service.spec.ts` - The feature name in this file does not follow kebab-case as recommended by the Angular style guide. It should be `api-service.service.spec.ts`.

## Impact of Renaming

Both the `breadcrubs` folder and the `apiservice` files are extensively referenced throughout the codebase in import statements and class extensions. Renaming these would require updating all these references, which could potentially introduce bugs if not done carefully.

## Recommended Approach

Given the extensive usage of these files and folders, it's recommended to:

1. Plan a dedicated refactoring effort for these changes
2. Use automated tools to help with the renaming and updating references
3. Implement comprehensive testing to ensure the changes don't break the application
4. Consider implementing these changes as part of a larger refactoring effort rather than as isolated changes

For new files and folders, ensure they follow the Angular style guide naming conventions:
- Use kebab-case for file and folder names
- Follow the pattern feature.type.ts for file names (e.g., hero-list.component.ts)