"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "_ssr_app_utils_notion_ts";
exports.ids = ["_ssr_app_utils_notion_ts"];
exports.modules = {

/***/ "(ssr)/./app/utils/notion.ts":
/*!*****************************!*\
  !*** ./app/utils/notion.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   deleteNoteFromNotion: () => (/* binding */ deleteNoteFromNotion),\n/* harmony export */   findNotionPageId: () => (/* binding */ findNotionPageId),\n/* harmony export */   syncNoteWithNotion: () => (/* binding */ syncNoteWithNotion),\n/* harmony export */   syncNotesFromNotion: () => (/* binding */ syncNotesFromNotion)\n/* harmony export */ });\nconst deleteNoteFromNotion = async (noteId, { apiKey, clientSecret, refreshToken })=>{\n    // TODO: Replace with actual Notion API implementation\n    if (!apiKey || !clientSecret || !refreshToken) {\n        throw new Error('Notion API key, client secret, or refresh token not configured');\n    }\n    const NOTION_DATABASE_ID = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID;\n    if (!NOTION_DATABASE_ID) {\n        throw new Error('Notion database ID not configured');\n    }\n    try {\n        // First, find the Notion page ID for this note\n        const searchResponse = await fetch(`https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`, {\n            method: 'POST',\n            headers: {\n                'Authorization': `Bearer ${apiKey}`,\n                'Notion-Version': '2022-06-28',\n                'Content-Type': 'application/json'\n            },\n            body: JSON.stringify({\n                filter: {\n                    property: 'note_id',\n                    rich_text: {\n                        equals: noteId\n                    }\n                }\n            })\n        });\n        if (!searchResponse.ok) {\n            throw new Error(`Failed to find note in Notion: ${searchResponse.statusText}`);\n        }\n        const searchData = await searchResponse.json();\n        if (searchData.results.length > 0) {\n            const notionPageId = searchData.results[0].id;\n            // Delete the page\n            const deleteResponse = await fetch(`https://api.notion.com/v1/pages/${notionPageId}`, {\n                method: 'DELETE',\n                headers: {\n                    'Authorization': `Bearer ${apiKey}`,\n                    'Notion-Version': '2022-06-28'\n                }\n            });\n            if (!deleteResponse.ok) {\n                throw new Error(`Failed to delete note from Notion: ${deleteResponse.statusText}`);\n            }\n        }\n    } catch (error) {\n        console.error('Error deleting from Notion:', error);\n        throw error;\n    }\n};\nconst findNotionPageId = async (noteId)=>{\n    const NOTION_API_KEY = process.env.NEXT_PUBLIC_NOTION_API_KEY;\n    const NOTION_DATABASE_ID = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID;\n    if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {\n        throw new Error('Notion API key or database ID not configured');\n    }\n    const searchResponse = await fetch(`https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`, {\n        method: 'POST',\n        headers: {\n            'Authorization': `Bearer ${NOTION_API_KEY}`,\n            'Notion-Version': '2022-06-28',\n            'Content-Type': 'application/json'\n        },\n        body: JSON.stringify({\n            filter: {\n                property: 'note_id',\n                rich_text: {\n                    equals: noteId\n                }\n            }\n        })\n    });\n    if (!searchResponse.ok) {\n        throw new Error(`Failed to find note in Notion: ${searchResponse.statusText}`);\n    }\n    const searchData = await searchResponse.json();\n    return searchData.results[0]?.id;\n};\nconst syncNotesFromNotion = async ({ apiKey, clientSecret, refreshToken })=>{\n    if (!apiKey || !clientSecret || !refreshToken) {\n        throw new Error('Notion API key, client secret, or refresh token not configured');\n    }\n    const NOTION_DATABASE_ID = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID;\n    if (!NOTION_DATABASE_ID) {\n        throw new Error('Notion database ID not configured');\n    }\n    const response = await fetch(`https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`, {\n        method: 'POST',\n        headers: {\n            'Authorization': `Bearer ${apiKey}`,\n            'Notion-Version': '2022-06-28',\n            'Content-Type': 'application/json'\n        }\n    });\n    if (!response.ok) {\n        throw new Error(`Failed to fetch notes from Notion: ${response.statusText}`);\n    }\n    const data = await response.json();\n    return data.results.map((page)=>({\n            id: page.properties.note_id.rich_text[0]?.plain_text || crypto.randomUUID(),\n            title: page.properties.title.title[0]?.plain_text || 'Untitled Note',\n            content: page.properties.content.rich_text.map((text)=>text.plain_text).join('\\n') || '',\n            tags: page.properties.tags.multi_select.map((tag)=>tag.name) || [],\n            createdAt: new Date(page.created_time),\n            updatedAt: new Date(page.last_edited_time)\n        }));\n};\nconst syncNoteWithNotion = async (note, { apiKey, clientSecret, refreshToken })=>{\n    // TODO: Replace with actual Notion API implementation\n    if (!apiKey || !clientSecret || !refreshToken) {\n        throw new Error('Notion API key, client secret, or refresh token not configured');\n    }\n    const NOTION_DATABASE_ID = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID;\n    if (!NOTION_DATABASE_ID) {\n        throw new Error('Notion database ID not configured');\n    }\n    try {\n        // Check if note already exists in Notion\n        const existingPageId = await findNotionPageId(note.id);\n        const endpoint = existingPageId ? `https://api.notion.com/v1/pages/${existingPageId}` : `https://api.notion.com/v1/pages`;\n        const response = await fetch(endpoint, {\n            method: existingPageId ? 'PATCH' : 'POST',\n            headers: {\n                'Authorization': `Bearer ${apiKey}`,\n                'Notion-Version': '2022-06-28',\n                'Content-Type': 'application/json'\n            },\n            body: JSON.stringify({\n                parent: {\n                    database_id: NOTION_DATABASE_ID\n                },\n                properties: {\n                    note_id: {\n                        rich_text: [\n                            {\n                                text: {\n                                    content: note.id\n                                }\n                            }\n                        ]\n                    },\n                    title: {\n                        title: [\n                            {\n                                text: {\n                                    content: note.title\n                                }\n                            }\n                        ]\n                    },\n                    content: {\n                        rich_text: note.content.split('\\n').map((line)=>({\n                                text: {\n                                    content: line\n                                }\n                            }))\n                    },\n                    tags: {\n                        multi_select: note.tags.map((tag)=>({\n                                name: tag\n                            }))\n                    }\n                }\n            })\n        });\n        if (!response.ok) {\n            throw new Error(`Failed to sync with Notion: ${response.statusText}`);\n        }\n        return await response.json();\n    } catch (error) {\n        console.error('Error syncing with Notion:', error);\n        throw error;\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O29CQUM1QztvQkFDQUMsU0FBUzt3QkFDUDNCLFdBQVd3QyxLQUFLYixPQUFPLENBQUNrQixLQUFLLENBQUMsTUFBTTFCLEdBQUcsQ0FBQzJCLENBQUFBLE9BQVM7Z0NBQy9DbEIsTUFBTTtvQ0FBRUQsU0FBU21CO2dDQUFLOzRCQUN4QjtvQkFDRjtvQkFDQWhCLE1BQU07d0JBQ0pDLGNBQWNTLEtBQUtWLElBQUksQ0FBQ1gsR0FBRyxDQUFDYSxDQUFBQSxNQUFRO2dDQUFFQyxNQUFNRDs0QkFBSTtvQkFDbEQ7Z0JBQ0Y7WUFDRjtRQUNGO1FBRUEsSUFBSSxDQUFDZixTQUFTZixFQUFFLEVBQUU7WUFDaEIsTUFBTSxJQUFJaEIsTUFBTSxDQUFDLDRCQUE0QixFQUFFK0IsU0FBU2QsVUFBVSxFQUFFO1FBQ3RFO1FBRUEsT0FBTyxNQUFNYyxTQUFTWixJQUFJO0lBQzVCLEVBQUUsT0FBT00sT0FBTztRQUNkQyxRQUFRRCxLQUFLLENBQUMsOEJBQThCQTtRQUM1QyxNQUFNQTtJQUNSO0FBQ0YsRUFBRSIsInNvdXJjZXMiOlsiL2hvbWUvcHJvamVjdC9hcHAvdXRpbHMvbm90aW9uLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBkZWxldGVOb3RlRnJvbU5vdGlvbiA9IGFzeW5jIChub3RlSWQ6IHN0cmluZywgeyBhcGlLZXksIGNsaWVudFNlY3JldCwgcmVmcmVzaFRva2VuIH06IHsgYXBpS2V5OiBzdHJpbmcsIGNsaWVudFNlY3JldDogc3RyaW5nLCByZWZyZXNoVG9rZW46IHN0cmluZyB9KSA9PiB7XG4gIC8vIFRPRE86IFJlcGxhY2Ugd2l0aCBhY3R1YWwgTm90aW9uIEFQSSBpbXBsZW1lbnRhdGlvblxuICBpZiAoIWFwaUtleSB8fCAhY2xpZW50U2VjcmV0IHx8ICFyZWZyZXNoVG9rZW4pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdGlvbiBBUEkga2V5LCBjbGllbnQgc2VjcmV0LCBvciByZWZyZXNoIHRva2VuIG5vdCBjb25maWd1cmVkJyk7XG4gIH1cbiAgY29uc3QgTk9USU9OX0RBVEFCQVNFX0lEID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfTk9USU9OX0RBVEFCQVNFX0lEO1xuICBpZiAoIU5PVElPTl9EQVRBQkFTRV9JRCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTm90aW9uIGRhdGFiYXNlIElEIG5vdCBjb25maWd1cmVkJyk7XG4gIH1cblxuICB0cnkge1xuICAgIC8vIEZpcnN0LCBmaW5kIHRoZSBOb3Rpb24gcGFnZSBJRCBmb3IgdGhpcyBub3RlXG4gICAgY29uc3Qgc2VhcmNoUmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkubm90aW9uLmNvbS92MS9kYXRhYmFzZXMvJHtOT1RJT05fREFUQUJBU0VfSUR9L3F1ZXJ5YCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke2FwaUtleX1gLFxuICAgICAgICAnTm90aW9uLVZlcnNpb24nOiAnMjAyMi0wNi0yOCcsXG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBmaWx0ZXI6IHtcbiAgICAgICAgICBwcm9wZXJ0eTogJ25vdGVfaWQnLFxuICAgICAgICAgIHJpY2hfdGV4dDoge1xuICAgICAgICAgICAgZXF1YWxzOiBub3RlSWRcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSk7XG5cbiAgICBpZiAoIXNlYXJjaFJlc3BvbnNlLm9rKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBmaW5kIG5vdGUgaW4gTm90aW9uOiAke3NlYXJjaFJlc3BvbnNlLnN0YXR1c1RleHR9YCk7XG4gICAgfVxuXG4gICAgY29uc3Qgc2VhcmNoRGF0YSA9IGF3YWl0IHNlYXJjaFJlc3BvbnNlLmpzb24oKTtcbiAgICBpZiAoc2VhcmNoRGF0YS5yZXN1bHRzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IG5vdGlvblBhZ2VJZCA9IHNlYXJjaERhdGEucmVzdWx0c1swXS5pZDtcbiAgICAgIFxuICAgICAgLy8gRGVsZXRlIHRoZSBwYWdlXG4gICAgICBjb25zdCBkZWxldGVSZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL2FwaS5ub3Rpb24uY29tL3YxL3BhZ2VzLyR7bm90aW9uUGFnZUlkfWAsIHtcbiAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke2FwaUtleX1gLFxuICAgICAgICAgICdOb3Rpb24tVmVyc2lvbic6ICcyMDIyLTA2LTI4JyxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIWRlbGV0ZVJlc3BvbnNlLm9rKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGRlbGV0ZSBub3RlIGZyb20gTm90aW9uOiAke2RlbGV0ZVJlc3BvbnNlLnN0YXR1c1RleHR9YCk7XG4gICAgICB9XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGRlbGV0aW5nIGZyb20gTm90aW9uOicsIGVycm9yKTtcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGZpbmROb3Rpb25QYWdlSWQgPSBhc3luYyAobm90ZUlkOiBzdHJpbmcpID0+IHtcbiAgY29uc3QgTk9USU9OX0FQSV9LRVkgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19OT1RJT05fQVBJX0tFWTtcbiAgY29uc3QgTk9USU9OX0RBVEFCQVNFX0lEID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfTk9USU9OX0RBVEFCQVNFX0lEO1xuXG4gIGlmICghTk9USU9OX0FQSV9LRVkgfHwgIU5PVElPTl9EQVRBQkFTRV9JRCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTm90aW9uIEFQSSBrZXkgb3IgZGF0YWJhc2UgSUQgbm90IGNvbmZpZ3VyZWQnKTtcbiAgfVxuXG4gIGNvbnN0IHNlYXJjaFJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLm5vdGlvbi5jb20vdjEvZGF0YWJhc2VzLyR7Tk9USU9OX0RBVEFCQVNFX0lEfS9xdWVyeWAsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHtOT1RJT05fQVBJX0tFWX1gLFxuICAgICAgJ05vdGlvbi1WZXJzaW9uJzogJzIwMjItMDYtMjgnLFxuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICB9LFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIGZpbHRlcjoge1xuICAgICAgICBwcm9wZXJ0eTogJ25vdGVfaWQnLFxuICAgICAgICByaWNoX3RleHQ6IHtcbiAgICAgICAgICBlcXVhbHM6IG5vdGVJZFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfSk7XG5cbiAgaWYgKCFzZWFyY2hSZXNwb25zZS5vaykge1xuICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGZpbmQgbm90ZSBpbiBOb3Rpb246ICR7c2VhcmNoUmVzcG9uc2Uuc3RhdHVzVGV4dH1gKTtcbiAgfVxuXG4gIGNvbnN0IHNlYXJjaERhdGEgPSBhd2FpdCBzZWFyY2hSZXNwb25zZS5qc29uKCk7XG4gIHJldHVybiBzZWFyY2hEYXRhLnJlc3VsdHNbMF0/LmlkO1xufTtcblxuaW50ZXJmYWNlIE5vdGlvblBhZ2Uge1xuICBwcm9wZXJ0aWVzOiB7XG4gICAgbm90ZV9pZDogeyByaWNoX3RleHQ6IFt7IHBsYWluX3RleHQ6IHN0cmluZyB9XSB9O1xuICAgIHRpdGxlOiB7IHRpdGxlOiBbeyBwbGFpbl90ZXh0OiBzdHJpbmcgfV0gfTtcbiAgICBjb250ZW50OiB7IHJpY2hfdGV4dDogW3sgcGxhaW5fdGV4dDogc3RyaW5nIH1dIH07XG4gICAgdGFnczogeyBtdWx0aV9zZWxlY3Q6IFt7IG5hbWU6IHN0cmluZyB9XSB9O1xuICB9O1xuICBjcmVhdGVkX3RpbWU6IHN0cmluZztcbiAgbGFzdF9lZGl0ZWRfdGltZTogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3Qgc3luY05vdGVzRnJvbU5vdGlvbiA9IGFzeW5jICh7IGFwaUtleSwgY2xpZW50U2VjcmV0LCByZWZyZXNoVG9rZW4gfTogeyBhcGlLZXk6IHN0cmluZywgY2xpZW50U2VjcmV0OiBzdHJpbmcsIHJlZnJlc2hUb2tlbjogc3RyaW5nIH0pID0+IHtcbiAgaWYgKCFhcGlLZXkgfHwgIWNsaWVudFNlY3JldCB8fCAhcmVmcmVzaFRva2VuKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb3Rpb24gQVBJIGtleSwgY2xpZW50IHNlY3JldCwgb3IgcmVmcmVzaCB0b2tlbiBub3QgY29uZmlndXJlZCcpO1xuICB9XG4gIGNvbnN0IE5PVElPTl9EQVRBQkFTRV9JRCA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX05PVElPTl9EQVRBQkFTRV9JRDtcbiAgICBpZiAoIU5PVElPTl9EQVRBQkFTRV9JRCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTm90aW9uIGRhdGFiYXNlIElEIG5vdCBjb25maWd1cmVkJyk7XG4gIH1cblxuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLm5vdGlvbi5jb20vdjEvZGF0YWJhc2VzLyR7Tk9USU9OX0RBVEFCQVNFX0lEfS9xdWVyeWAsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHthcGlLZXl9YCxcbiAgICAgICdOb3Rpb24tVmVyc2lvbic6ICcyMDIyLTA2LTI4JyxcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgfVxuICB9KTtcblxuICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gZmV0Y2ggbm90ZXMgZnJvbSBOb3Rpb246ICR7cmVzcG9uc2Uuc3RhdHVzVGV4dH1gKTtcbiAgfVxuXG4gIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gIHJldHVybiBkYXRhLnJlc3VsdHMubWFwKChwYWdlOiBOb3Rpb25QYWdlKSA9PiAoe1xuICAgIGlkOiBwYWdlLnByb3BlcnRpZXMubm90ZV9pZC5yaWNoX3RleHRbMF0/LnBsYWluX3RleHQgfHwgY3J5cHRvLnJhbmRvbVVVSUQoKSxcbiAgICB0aXRsZTogcGFnZS5wcm9wZXJ0aWVzLnRpdGxlLnRpdGxlWzBdPy5wbGFpbl90ZXh0IHx8ICdVbnRpdGxlZCBOb3RlJyxcbiAgICBjb250ZW50OiBwYWdlLnByb3BlcnRpZXMuY29udGVudC5yaWNoX3RleHQubWFwKHRleHQgPT4gdGV4dC5wbGFpbl90ZXh0KS5qb2luKCdcXG4nKSB8fCAnJyxcbiAgICB0YWdzOiBwYWdlLnByb3BlcnRpZXMudGFncy5tdWx0aV9zZWxlY3QubWFwKHRhZyA9PiB0YWcubmFtZSkgfHwgW10sXG4gICAgY3JlYXRlZEF0OiBuZXcgRGF0ZShwYWdlLmNyZWF0ZWRfdGltZSksXG4gICAgdXBkYXRlZEF0OiBuZXcgRGF0ZShwYWdlLmxhc3RfZWRpdGVkX3RpbWUpXG4gIH0pKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzeW5jTm90ZVdpdGhOb3Rpb24gPSBhc3luYyAobm90ZToge1xuICBpZDogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xuICBjb250ZW50OiBzdHJpbmc7XG4gIHRhZ3M6IHN0cmluZ1tdO1xufSwgeyBhcGlLZXksIGNsaWVudFNlY3JldCwgcmVmcmVzaFRva2VuIH06IHsgYXBpS2V5OiBzdHJpbmcsIGNsaWVudFNlY3JldDogc3RyaW5nLCByZWZyZXNoVG9rZW46IHN0cmluZyB9KSA9PiB7XG4gIC8vIFRPRE86IFJlcGxhY2Ugd2l0aCBhY3R1YWwgTm90aW9uIEFQSSBpbXBsZW1lbnRhdGlvblxuICBpZiAoIWFwaUtleSB8fCAhY2xpZW50U2VjcmV0IHx8ICFyZWZyZXNoVG9rZW4pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdGlvbiBBUEkga2V5LCBjbGllbnQgc2VjcmV0LCBvciByZWZyZXNoIHRva2VuIG5vdCBjb25maWd1cmVkJyk7XG4gIH1cbiAgY29uc3QgTk9USU9OX0RBVEFCQVNFX0lEID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfTk9USU9OX0RBVEFCQVNFX0lEO1xuICAgIGlmICghTk9USU9OX0RBVEFCQVNFX0lEKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb3Rpb24gZGF0YWJhc2UgSUQgbm90IGNvbmZpZ3VyZWQnKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgLy8gQ2hlY2sgaWYgbm90ZSBhbHJlYWR5IGV4aXN0cyBpbiBOb3Rpb25cbiAgICBjb25zdCBleGlzdGluZ1BhZ2VJZCA9IGF3YWl0IGZpbmROb3Rpb25QYWdlSWQobm90ZS5pZCk7XG4gICAgXG4gICAgY29uc3QgZW5kcG9pbnQgPSBleGlzdGluZ1BhZ2VJZCBcbiAgICAgID8gYGh0dHBzOi8vYXBpLm5vdGlvbi5jb20vdjEvcGFnZXMvJHtleGlzdGluZ1BhZ2VJZH1gXG4gICAgICA6IGBodHRwczovL2FwaS5ub3Rpb24uY29tL3YxL3BhZ2VzYDtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goZW5kcG9pbnQsIHtcbiAgICAgIG1ldGhvZDogZXhpc3RpbmdQYWdlSWQgPyAnUEFUQ0gnIDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHthcGlLZXl9YCxcbiAgICAgICAgJ05vdGlvbi1WZXJzaW9uJzogJzIwMjItMDYtMjgnLFxuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgcGFyZW50OiB7IGRhdGFiYXNlX2lkOiBOT1RJT05fREFUQUJBU0VfSUQgfSxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgIG5vdGVfaWQ6IHtcbiAgICAgICAgICAgIHJpY2hfdGV4dDogW3sgdGV4dDogeyBjb250ZW50OiBub3RlLmlkIH0gfV1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHRpdGxlOiB7XG4gICAgICAgICAgICB0aXRsZTogW3sgdGV4dDogeyBjb250ZW50OiBub3RlLnRpdGxlIH0gfV1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgICAgIHJpY2hfdGV4dDogbm90ZS5jb250ZW50LnNwbGl0KCdcXG4nKS5tYXAobGluZSA9PiAoe1xuICAgICAgICAgICAgICB0ZXh0OiB7IGNvbnRlbnQ6IGxpbmUgfVxuICAgICAgICAgICAgfSkpXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0YWdzOiB7XG4gICAgICAgICAgICBtdWx0aV9zZWxlY3Q6IG5vdGUudGFncy5tYXAodGFnID0+ICh7IG5hbWU6IHRhZyB9KSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBzeW5jIHdpdGggTm90aW9uOiAke3Jlc3BvbnNlLnN0YXR1c1RleHR9YCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBzeW5jaW5nIHdpdGggTm90aW9uOicsIGVycm9yKTtcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufTtcbiJdLCJuYW1lcyI6WyJkZWxldGVOb3RlRnJvbU5vdGlvbiIsIm5vdGVJZCIsImFwaUtleSIsImNsaWVudFNlY3JldCIsInJlZnJlc2hUb2tlbiIsIkVycm9yIiwiTk9USU9OX0RBVEFCQVNFX0lEIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX05PVElPTl9EQVRBQkFTRV9JRCIsInNlYXJjaFJlc3BvbnNlIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJmaWx0ZXIiLCJwcm9wZXJ0eSIsInJpY2hfdGV4dCIsImVxdWFscyIsIm9rIiwic3RhdHVzVGV4dCIsInNlYXJjaERhdGEiLCJqc29uIiwicmVzdWx0cyIsImxlbmd0aCIsIm5vdGlvblBhZ2VJZCIsImlkIiwiZGVsZXRlUmVzcG9uc2UiLCJlcnJvciIsImNvbnNvbGUiLCJmaW5kTm90aW9uUGFnZUlkIiwiTk9USU9OX0FQSV9LRVkiLCJORVhUX1BVQkxJQ19OT1RJT05fQVBJX0tFWSIsInN5bmNOb3Rlc0Zyb21Ob3Rpb24iLCJyZXNwb25zZSIsImRhdGEiLCJtYXAiLCJwYWdlIiwicHJvcGVydGllcyIsIm5vdGVfaWQiLCJwbGFpbl90ZXh0IiwiY3J5cHRvIiwicmFuZG9tVVVJRCIsInRpdGxlIiwiY29udGVudCIsInRleHQiLCJqb2luIiwidGFncyIsIm11bHRpX3NlbGVjdCIsInRhZyIsIm5hbWUiLCJjcmVhdGVkQXQiLCJEYXRlIiwiY3JlYXRlZF90aW1lIiwidXBkYXRlZEF0IiwibGFzdF9lZGl0ZWRfdGltZSIsInN5bmNOb3RlV2l0aE5vdGlvbiIsIm5vdGUiLCJleGlzdGluZ1BhZ2VJZCIsImVuZHBvaW50IiwicGFyZW50IiwiZGF0YWJhc2VfaWQiLCJzcGxpdCIsImxpbmUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./app/utils/notion.ts\n");

/***/ })

};
;