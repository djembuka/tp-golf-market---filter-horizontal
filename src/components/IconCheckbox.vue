<template>
    <span class="vm-filter-checkbox__control">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="7" viewBox="0 0 10 7" fill="none">
            <path d="M1 2.66667L4.2 6L9 1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </span>
</template>

<style>
.vm-filter-checkbox__control {
    --base-black: #000;
    --base-black-07: #000000bb;
    --base-grey-200: #DFDFDF;
    --base-white: #FFF;

    display: flex;
    width: 16px;
    height: 16px;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1/1;
    border-radius: 2px;
    border: 1px solid var(--base-grey-200);
    background: var(--base-white);
    transition: all .3s ease;
    -webkit-transition: all .3s ease;
}
.vm-filter-checkbox__control svg {
    display: none;
}
.vm-filter-checkbox:hover .vm-filter-checkbox__control {
    border-color: var(--base-black);
}
.vm-filter-checkbox input:checked + .vm-filter-checkbox__control {
    border: 1px solid var(--base-black);
    background: var(--base-black);
}
.vm-filter-checkbox input:checked + .vm-filter-checkbox__control svg {
    display: block;
}
.vm-filter-checkbox:hover input:checked + .vm-filter-checkbox__control {
    border: 1px solid var(--base-black-07);
    background: var(--base-black-07);
}
</style>