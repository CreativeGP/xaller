# -*- coding: utf-8 -*-

"""Xaller alpha
programmer: CreativeGP
"""
import Global
import genfunc

class WebObject:
    """This class represents a web part."""

    html_tag_names = {"Image":"img", "Button":"button", "Textbox":"textarea"}

    def __init__(self, variable, pos):
        self.var = variable
        self.pos = pos

    def get_web_type_name(self):
        name_to_find = self.var.name + "._web"
        return genfunc.get_var(name_to_find).value.string

    def create(self):
        """Output a JS code creating a DOM variable."""
        # HACK: ここのコードだけ継承されても型を識別できるように特別な変数だけ動的に参照するようにしている
        typename = ''
        if genfunc.is_var_exists(self.var.name + "._web"):
            typename = genfunc.get_var(self.var.name + "._web").value.string

        selector = ""
        func = ""
        if "at " in self.pos:
            func = "after"
        elif "before " in self.pos:
            func = "before"
        elif "in " in self.pos:
            func = "append"

        if " end" in self.pos:
            selector = 'body'
            func = 'append'
        elif " begnn" in self.pos:
            selector = 'body'
            func = 'prepend'
        else:
            selector = "#" + self.pos[self.pos.find(" ")+1:]

        if typename == 'HTML':
            genfunc.out('$(%s).%s("<ran id=%s></ran>");'
                % (genfunc.S(selector), func,
                   genfunc.S(genfunc.expid(self.var.name))))
        if typename == 'Label':
            genfunc.out('$(%s).%s("<p id=%s></p>");'
                % (genfunc.S(selector), func,
                   genfunc.S(genfunc.expid(self.var.name))))
        elif typename == 'Button':
            genfunc.out('$(%s).%s("<button type=%s id=%s></button>");'
                % (genfunc.S(selector), func, genfunc.S('button'),
                   genfunc.S(genfunc.expid(self.var.name))))
        elif typename == 'Textbox':
            genfunc.out('$(%s).%s("<textarea id=%s name=%s></textarea>");'
                % (genfunc.S(selector), func,
                   genfunc.S(genfunc.expid(self.var.name)),
                   genfunc.S(genfunc.expid(self.var.name))))
        elif typename == 'Div':
            genfunc.out('$(%s).%s("<div id=%s></div>");'
                % (genfunc.S(selector), func,
                   genfunc.S(genfunc.expid(self.var.name))))
        elif typename == 'Image':
            genfunc.out('$(%s).%s("<img id=%s>");'
                % (genfunc.S(selector), func,
                   genfunc.S(genfunc.expid(self.var.name))))


    def find_by_name(name):
        """Find the web object by its name."""
        for wob in Global.wobs:
            if wob.var.name == name:
                return wob
        return None


    def find_by_var(var):
        """Find the web object by its variable.

        Recommanded to use this method as possible rather than use
        find_by_name(). The reason is that this is safer using `is`
        operator to find.
        """
        for wob in Global.wobs:
            if wob.var is var:
                return wob
        return None

    def is_attr_name(self, name):
        if name in Global.html_rules['global']['attr']:
            return 'global'

        if self.get_web_type_name() in WebObject.html_tag_names:
            rules = Global.html_rules[WebObject.html_tag_names[self.get_web_type_name()]]
            if name in rules['attr'].keys():
                return 'attr'
        return 'no'


    def refer(self, mem_name):
        """Returns a string code to refer a member of the web object."""
        attr_kind = self.is_attr_name(mem_name)

        if mem_name == 'text':
            return ("$(%s).html()"
                    % (genfunc.S("#" + genfunc.expid(self.var.name))))
        elif attr_kind != 'no':
            # TODO(cgp) Check if the attribute is boolean.
            return ("$('%s').attr('%s')" %
                    ("#" + genfunc.expid(self.var.name),
                     mem_name))
        return ''


    def change(self, mem_name, dst_string):
        """Change a web parts."""
        attr_kind = self.is_attr_name(mem_name)

        if mem_name == 'text':
            genfunc.outnoln("$(%s).html(%s);"
                            % (genfunc.S("#" + genfunc.expid(self.var.name)),
                               dst_string))
        elif attr_kind != 'no':
            genfunc.out("$('%s').attr('%s', %s);" %
                        ("#" + genfunc.expid(self.var.name),
                         mem_name, dst_string))
