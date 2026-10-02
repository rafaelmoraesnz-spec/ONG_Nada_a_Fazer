import { defineConfig } from 'vite';
import { minify } from 'html-minifier-terser';

// O Vite já minifica o JavaScript e o CSS no build, mas não o HTML.
// Este plugin minifica o index.html gerado: remove espaços, quebras de linha e comentários.
function minificarHtml() {
    return {
        name: 'minificar-html',
        apply: 'build',
        transformIndexHtml: {
            order: 'post',
            handler: (html) => minify(html, {
                collapseWhitespace: true,
                removeComments: true,
                minifyCSS: true,
                minifyJS: true,
            }),
        },
    };
}

export default defineConfig({
    plugins: [minificarHtml()],
    server: { port: 8123 },
    preview: { port: 8123 },
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        minify: true,      // JavaScript minificado (Oxc, padrão do Vite 8)
        cssMinify: true,   // CSS minificado (Lightning CSS)
    },
});
